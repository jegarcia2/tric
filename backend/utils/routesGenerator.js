// utils/routesGenerator.js
function routesGenerator(router, model, name) {
  router.get(`/${name}`, async (req, res) => {
    res.json(await model.findAll());
  });

  router.get(`/${name}/:id`, async (req, res) => {
    const item = await model.findByPk(req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
  });

  router.post(`/${name}`, async (req, res) => {
    const newItem = await model.create(req.body);
    res.status(201).json(newItem);
  });

  router.put(`/${name}/:id`, async (req, res) => {
    const item = await model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json(item);
  });

  router.delete(`/${name}/:id`, async (req, res) => {
    const item = await model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.destroy();
    res.json({ success: true });
  });
}

module.exports = routesGenerator;