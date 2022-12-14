import Provider from '../../models/providerModel';
import reAssign from '../../utils/reAssign';

function providerProvideridController(Article) {
  // it's used as middleware to get provider, in provider router
  async function findProviderByCuit(req, res, next) {
    if (req.loggedUser.userRole !== 'admin') {
      return res.sendStatus(403);
    }

    const query = { 'providers.cuit': req.params.providerCuit };

    try {
      const providers = await Article.distinct('providers', query);

      if (providers && providers.length) {
        [req.provider] = providers;
        return next();
      }

      return res.sendStatus(404);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  function get(req, res) {
    const { provider } = req;
    const businessName = encodeURIComponent(provider.businessName);

    provider.links = {
      filterByThisBusinessName: `http://${req.headers.host}/api/providers/?businessName=${businessName}`,
    };

    res.json(provider);
  }

  async function put(req, res) {
    const { provider } = req;
    const { cuit } = provider;
    reAssign(provider, req.body, Provider.schema);

    try {
      await Article.updateMany(
        { 'providers.cuit': cuit }, // match articles with that provider
        { $set: { 'providers.$[provider]': provider } }, // set new provider
        { arrayFilters: [{ 'provider.cuit': cuit }] }, // inside an article, match only the right providers
      );
      return res.json(provider);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function patch(req, res) {
    const { provider } = req;
    const { cuit } = provider;

    if (req.body._id) { delete req.body._id; } // eslint-disable-line no-underscore-dangle
    Object.assign(provider, req.body);

    try {
      await Article.updateMany(
        { 'providers.cuit': cuit }, // match articles with that provider
        { $set: { 'providers.$[provider]': provider } }, // set new provider
        { arrayFilters: [{ 'provider.cuit': cuit }] }, // inside an article, match only the right providers
      );
      return res.json(provider);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function remove(req, res) {
    const { provider: { cuit } } = req;

    try {
      await Article.updateMany(
        { 'providers.cuit': cuit }, // match articles with that provider
        { $unset: { 'providers.$[provider]': '' } }, // delete provider
        { arrayFilters: [{ 'provider.cuit': cuit }] }, // inside an article, match only the right providers
      );
      return res.sendStatus(204);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return {
    findProviderByCuit,
    get,
    put,
    patch,
    remove,
  };
}

module.exports = providerProvideridController;
