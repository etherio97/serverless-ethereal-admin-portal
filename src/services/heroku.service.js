const { HEROKU_API, HEROKU_BOARD, HEROKU_SECRET } = require('../config');
const { default: axios } = require('axios');

const headers = {
  Accept: 'application/vnd.heroku+json; version=3',
  Authorization: 'Bearer ' + HEROKU_SECRET,
};

class HerokuService {
  getApps() {
    return this._sendApi('GET', 'apps');
  }

  getApp(app_id) {
    return this._sendApi('GET', ['apps', app_id].join('/'));
  }

  getAppState(apps) {
    return axios.post([HEROKU_BOARD, 'app-states'].join('/'), { apps }, { headers })
      .then((res) => res.data);
  }

  _sendApi(method, path, data = null) {
    const url = [HEROKU_API, path].join('/');
    const options = {
      method,
      url,
      data,
      headers,
    };
    return axios(options).then((res) => res.data);
  }
}

module.exports = new HerokuService();
