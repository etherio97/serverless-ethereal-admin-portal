const {
  FIREBASE_API_KEY,
  GOOGLE_SECURETOKEN,
  GOOGLE_IDENTITYTOOLKIT,
} = require('../config');
const { default: axios } = require('axios');

class FirebaseService {
  getIdToken(refresh_token) {
    return this._sendApi(GOOGLE_SECURETOKEN, 'v1/token', {
      grant_type: 'refresh_token',
      refresh_token,
    });
  }

  getUserData(idToken) {
    return this._sendApi(GOOGLE_IDENTITYTOOLKIT, 'v1/accounts:lookup', {
      idToken,
    });
  }

  signUpWithEmailAndPassword(email, password) {
    return this._sendApi(GOOGLE_IDENTITYTOOLKIT, 'v1/accounts:signUp', {
      email,
      password,
      returnSecureToken: true,
    });
  }

  signInWithEmailAndPassword(email, password) {
    return this._sendApi(
      GOOGLE_IDENTITYTOOLKIT,
      'v1/accounts:signInWithPassword',
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  updateUser({
    idToken,
    email,
    password,
    displayName,
    photoUrl,
    deleteAttribute,
  }) {
    return this._sendApi(GOOGLE_IDENTITYTOOLKIT, 'v1/accounts:update', {
      idToken,
      email,
      password,
      displayName,
      photoUrl,
      deleteAttribute,
      returnSecureToken: true,
    });
  }

  sendResetPassword(email) {
    return this.sendOobCode('PASSWORD_RESET', { email });
  }

  sendConfirmEmail(email, idToken) {
    return this.sendOobCode('VERIFY_EMAIL', { email, idToken });
  }

  sendOobCode(requestType, data = {}) {
    return this._sendApi(GOOGLE_IDENTITYTOOLKIT, 'v1/accounts:sendOobCode', {
      requestType,
      ...data,
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
