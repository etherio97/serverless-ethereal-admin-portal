const { GITHUB_API, GITHUB_SECRET } = require('../config');
const { default: axios } = require('axios');

class GithubService {
  getUser(user) {
    return this._sendApi('GET', ['users', user]);
  }

  getUserRepos(user, params = {}) {
    return this._sendApi('GET', ['users', user, 'repos'], null, params);
  }

  getRepo(user, repo) {
    return this._sendApi('GET', ['repos', user, repo]);
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