const { GITHUB_API, GITHUB_SECRET } = require('../config');
const { default: axios } = require('axios');

class GithubService {
  getUser(user) {
    return this._sendApi('GET', ['users', user]);
  }

  getUserRepos(user, params = {}) {
    return this._sendApi('GET', ['users', user, 'repos'], null, params);
  }

  createRepo(data) {
    return this._sendApi('POST', ['user', 'repos'], data);
  }

  deleteRepo(user, repo) {
    return this._sendApi('DELETE', ['repos', user, repo]);
  }

  getRepo(user, repo) {
    return this._sendApi('GET', ['repos', user, repo]);
  }

  getHooks(user, repo, params = {}) {
    return this._sendApi('GET', ['repos', user, repo, 'hooks'], null, params);
  }

  getHook(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'hooks', id]);
  }

  getRunners(user, repo, params = {}) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'runners'], null, params);
  }

  getRunner(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'runners', id]);
  }

  getArtifacts(user, repo, params = {}) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'artifacts'], null, params);
  }

  getArtifact(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'artifacts', id]);
  }

  getWorkflows(user, repo, params = {}) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'workflows'], null, params);
  }

  getWorkflow(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'workflows', id]);
  }

  disableWorkflow(user, repo, id) {
    return this._sendApi('PUT', ['repos', user, repo, 'actions', 'workflows', id, 'disable']);
  }

  enableWorkflow(user, repo, id) {
    return this._sendApi('PUT', ['repos', user, repo, 'actions', 'workflows', id, 'enable']);
  }

  dispatchWorkflow(user, repo, id, { ref, inputs }) {
    return this._sendApi('POST', ['repos', user, repo, 'actions', 'workflows', id, 'dispatches'], {
      ref,
      inputs,
    });
  }

  getWorkflowUsage(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'workflows', id, 'timing']);
  }

  getWorkflowRuns(user, repo, id, params = {}) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'workflows', id, 'runs'], null, params);
  }

  getRun(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'runs', id]);
  }

  deleteRun(user, repo, id) {
    return this._sendApi('DELETE', ['repos', user, repo, 'actions', 'runs', id]);
  }

  cancelRun(user, repo, id) {
    return this._sendApi('POST', ['repos', user, repo, 'actions', 'runs', id, 'cancel']);
  }

  getRunJobs(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'runs', id, 'jobs']);
  }

  getRunLogs(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'runs', id, 'logs']);
  }

  deleteRunLogs(user, repo, id) {
    return this._sendApi('DELETE', ['repos', user, repo, 'actions', 'runs', id, 'logs']);
  }

  reRun(user, repo, id) {
    return this._sendApi('POST', ['repos', user, repo, 'actions', 'runs', id, 'rerun']);
  }

  reRunFailedJobs(user, repo, id) {
    return this._sendApi('POST', ['repos', user, repo, 'actions', 'runs', id, 'rerun-failed-jobs']);
  }

  getRunUsage(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'runs', id, 'timing']);
  }

  getJob(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'jobs', id]);
  }

  getJobLogs(user, repo, id) {
    return this._sendApi('GET', ['repos', user, repo, 'actions', 'jobs', id, 'logs']);
  }

  _sendApi(method, path = [], data = null, params = {}) {
    const url = new URL(GITHUB_API);
    url.pathname = path.join('/');
    for (let key in params) {
      url.searchParams.append(key, params[key]);
    }
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      Authorization: 'token ' + GITHUB_SECRET,
    };
    const options = {
      method,
      url: url.toString(),
      data,
      headers,
    };
    return axios(options).then((res) => res.data);
  }
}

module.exports = new GithubService();