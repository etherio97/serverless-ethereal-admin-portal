const app = require('../src/app');
const service = require('../src/services/heroku.service');

app.get('/heroku/apps', async (req, res) => {
  res.json(await service.getApps());
});

app.get('/heroku/apps/:id', async (req, res) => {
  res.json(await service.getApp(req.params.id));
});

app.get('/heroku/app-state', async (req, res) => {
  res.json(await service.getAppState(req.query.apps || ''));
});

module.exports = app;
