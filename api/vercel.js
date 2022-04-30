const app = require('../src/app');
const service = require('../src/services/vercel.service');
const guard = require('../src/guards/auth.guard');

app.use(guard.canActivate());

app.get('/vercel/domains', async (req, res) => {
  try {
    res.json(await service.getDomains());
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/vercel/projects', async (req, res) => {
  try {
    res.json(await service.getProjects());
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/vercel/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await service.getProject(id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/vercel/projects/:id/domains', async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await service.getProjectDomains(id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

module.exports = app;
