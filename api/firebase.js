const app = require('../src/app');
const service = require('../src/services/firebase.service');

const COOKIE_NAME = '__Secure-RefreshToken';

app.get('/firebase/slient-check', async (req, res) => {
  try {
    const cookies = {
      ...req.cookies,
      ...req.signedCookies,
    };
    console.log(cookies);
    const refreshToken = cookies[COOKIE_NAME];
    res.send('ok');
  } catch(e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const credential = await service.signInWithEmailAndPassword(email, password);
    res.setHeader('set-cookie', `${COOKIE_NAME}=${credential.refreshToken}; Secure; HttpOnly`);
    res.json(credential);
  } catch(e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/account', async (req, res) => {
  try {
    const { idToken } = req.body;
    res.json(await service.getUserData(idToken));
  } catch(e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    res.json(await service.getIdToken(refreshToken));
  } catch(e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

module.exports = app;
