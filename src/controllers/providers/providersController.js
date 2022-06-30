function providerController(Article) {
  async function get(req, res) {
    const query = {};
    if (req.query.businessName) {
      query['providers.businessName'] = req.query.businessName;
    }

    try {
      let providers = await Article.distinct('providers', query);

      providers = providers.filter((provider) => provider); // delete null providers

      if (query['providers.businessName']) {
        providers = providers.filter(
          (provider) => provider.businessName === query['providers.businessName'],
        );
      }

      const returnProviders = providers.map((provider) => {
        const newProvider = { ...provider };
        const businessName = encodeURIComponent(provider.businessName);
        const cuit = encodeURIComponent(provider.cuit);

        newProvider.links = {
          self: `http://${req.headers.host}/api/providers/${cuit}`,
          filterByThisBusinessName: `http://${req.headers.host}/api/providers/?businessName=${businessName}`,
        };
        return newProvider;
      });

      return res.json(returnProviders);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return { get };
}

module.exports = providerController;
