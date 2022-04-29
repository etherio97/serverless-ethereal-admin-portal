const { FIREBASE_API_KEY, GOOGLE_SECURETOKEN, GOOGLE_IDENTITYTOOLKIT } = require('../config');
const { default: axios } = require('axios');

class FirebaseService {
  getUserData(idToken) {
    return this._sendApi(GOOGLE_IDENTITYTOOLKIT, 'v1/accounts:lookup', {
      idToken,
    });
  }
  
  signInWithEmailAndPassword(email, password) {
    return this._sendApi(GOOGLE_IDENTITYTOOLKIT, 'v1/accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
  }
  
  getIdToken(refresh_token) {
    return this._sendApi(GOOGLE_SECURETOKEN, 'v1/token', {
      grant_type: 'refresh_token',
      refresh_token,
    });
  }
  
  _sendApi(baseUrl, path, data = null) {
    const url = [baseUrl, path].join('/') + '?key=' + FIREBASE_API_KEY;
    const options = {
      method: 'POST',
      url,
      data,
    };
    return axios(options).then((res) => res.data);
  }
}

module.exports = new FirebaseService();
