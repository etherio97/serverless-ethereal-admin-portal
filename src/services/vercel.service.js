const { VERCEL_SECRET, VERCEL_API } = require('../config');
const { default: axios } = require('axios');

class VercelService {
  getDomains() {
    return this._sendApi('GET', 'v4/domains');
  }
  
  getProjects() {
    return this._sendApi('GET', 'v8/projects');
  }
  
  getProject(projectId) {
    return this._sendApi('GET', ['v8/projects', projectId].join('/'));
  }
  
  getProjectDomains(projectId) {
    return this._sendApi('GET', ['v8/projects', projectId, 'domains'].join('/'));
  }
  
  _sendApi(method, path, data = null) {
    const headers = {
      Authorization: 'Bearer ' + VERCEL_SECRET,
    };
    const url = [VERCEL_API, path].join('/');
    const options = {
      method,
      url,
      data,
      headers,
    };
    return axios(options).then((res) => res.data);
  }
}

module.exports = new VercelService();