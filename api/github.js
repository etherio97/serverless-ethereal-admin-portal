const app = require('../src/app');
const service = require('../src/services/github.service');

app.get('/github/:user/repos', async (req, res) => {
  try {
    const { user } = req.params;
    res.json(await service.getUserRepos(user, req.query));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/github/:user', async (req, res) => {
  try {
    const { user } = req.params;
    res.json(await service.getUser(user));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/github/:user/:repo', async (req, res) => {
  try {
    const { user, repo } = req.params;
    res.json(await service.getRepo(user, repo));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

module.exports = app;