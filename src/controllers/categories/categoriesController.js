function categoriesController(Article) {
  async function get(req, res) {
    const query = {};
    if (req.query.description) { // text search (text index must be defined)
      query.$text = { $search: req.query.description };
    }

    try {
      const categories = await Article.distinct('category', query);

      const returnCategories = categories
        .filter((category) => category) //  delete null categories
        .map((category) => {
          const newCategory = { ...category };
          const name = encodeURIComponent(newCategory.name);
          newCategory.links = {
            self: `http://${req.headers.host}/api/categories/${name}`,
          };
          return newCategory;
        });

      return res.json(returnCategories);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return { get };
}

module.exports = categoriesController;
