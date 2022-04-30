const COOKIE_NAME = '__Secure-RefreshToken';

const app = require('../src/app');
const service = require('../src/services/firebase.service');
const guard = require('../src/guards/auth.guard');

app.post('/firebase/auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    const credential = await service.signInWithEmailAndPassword(
      email,
      password
    );
    res.setHeader(
      'set-cookie',
      `${COOKIE_NAME}=${credential.refreshToken}; Secure; HttpOnly`
    );
    res.json(credential);
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/verify', async (req, res) => {
  try {
    const { idToken } = req.body;
    res.json(await service.getUserData(idToken));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    res.json(await service.getIdToken(refreshToken));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/update:profile', guard.canActivate(), async (req, res) => {
  try {
    const { idToken } = req.auth;
    const { displayName, photoUrl, deleteAttribute } = req.body;
    res.json(
      await service.updateUser({
        idToken,
        displayName,
        photoUrl,
        deleteAttribute,
      })
    );
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/update:password', guard.canActivate(), async (req, res) => {
  try {
    const { idToken } = req.auth;
    const { password } = req.body;
    res.json(
      await service.updateUser({
        idToken,
        password,
      })
    );
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/update:email', guard.canActivate(), async (req, res) => {
  try {
    const { idToken } = req.auth;
    const { email } = req.body;
    res.json(
      await service.updateUser({
        idToken,
        email,
      })
    );
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    res.json(await service.sendResetPassword(email));
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.get('/firebase/slient-check', async (req, res) => {
  try {
    const cookies = {
      ...req.cookies,
      ...req.signedCookies,
    };
    const refreshToken = cookies[COOKIE_NAME];
    if (refreshToken) {
      const credential = await service.getIdToken(refreshToken);
      res.json(credential);
    } else {
      res.status(403).json({
        error: 'Forbidden',
      });
    }
  } catch (e) {
    const response = e.response || {};
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/logout', (req, res) => {
  res.setHeader(
    'set-cookie',
    `${COOKIE_NAME}=; Expires=Thu, Jan 01 1970 00:00:00 UTC; Secure; HttpOnly`
  );
  res.redirect('/login.html');
  res.end();
});

module.exports = app;
