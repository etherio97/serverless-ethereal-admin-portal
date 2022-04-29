const app = require('../src/app');
const service = require('../src/services/github.service');

app.get('/github/:user/repos', async (req, res) => {
  try {
    const { user } = req.params;
    const params = req.query;
    delete params.secret;
    res.json(await service.getUserRepos(user, params));
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

app.get('/github/*', async (req, res) => {
  try {
    const { originalUrl } = req;
    const params = req.query;
    const path = originalUrl.replace('/github/', '');
    delete params.secret;
    res.json(await service._sendApi('GET', [path], null, params));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

module.exports = app;