const app = require('../src/app');
const service = require('../src/services/heroku.service');

app.get('/apps', async (req, res) => {
  res.json(await service.getApps());
});

app.get('/apps/:id', async (req, res) => {
  res.json(await service.getApp(req.params.id));
});

app.get('/app-state', async (req, res) => {
  res.json(await service.getAppState(req.query.apps || ''));
});

module.exports = app;
