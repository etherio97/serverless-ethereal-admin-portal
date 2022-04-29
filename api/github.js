const app = require('../src/app');
const service = require('../src/services/github.service');
const guard = require('../src/guards/auth.guard');

app.use(guard.canActivate());

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

app.get('/github/:user/:repo/workflows', async (req, res) => {
  try {
    const { user, repo } = req.params;
    const params = req.params;
    res.json(await service.getWorkflows(user, repo, params));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/github/:user/:repo/workflows/:id', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.getWorkflow(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/github/:user/:repo/workflows/:id/dispatches', async (req, res) => {
  try {
    const { ref, inputs } = req.body;
    const { user, repo, id } = req.params;
    res.json(await service.dispatchWorkflow(user, repo, id, { ref, inputs }));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/github/:user/:repo/workflows/:id/runs', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    const params = req.query;
    res.json(await service.getWorkflowRuns(user, repo, id, params));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/github/:user/:repo/runs/:id', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.getRun(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/github/:user/:repo/runs/:id/logs', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.getRunLogs(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/github/:user/:repo/runs/:id/rerun', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.reRun(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/github/:user/:repo/runs/:id/rerun-failed-jobs', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.reRunFailedJobs(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.delete('/github/:user/:repo/runs/:id/logs', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.deleteRunLogs(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.delete('/github/:user/:repo/runs/:id', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.deleteRun(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/github/:user/:repo/runs/:id/cancel', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.cancelRun(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/github/:user/:repo/jobs/:id', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    const params = req.query;
    res.json(await service.getJob(user, repo, id, params));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/github/:user/:repo/jobs/:id/logs', async (req, res) => {
  try {
    const { user, repo, id } = req.params;
    res.json(await service.getJobLogs(user, repo, id));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

module.exports = app;