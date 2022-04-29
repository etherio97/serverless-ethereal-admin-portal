const app = require('../src/app');
const service = require('../src/services/firebase.service');

app.post('/firebase/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    res.json(await service.signInWithEmailAndPassword(email, password));
  } catch(e) {
    const response = e.response;
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/account', async (req, res) => {
  try {
    const { idToken } = req.body;
    res.json(await service.getUserData(idToken));
  } catch(e) {
    const response = e.response;
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

app.post('/firebase/token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    res.json(await service.getIdToken(refreshToken));
  } catch(e) {
    const response = e.response;
    res.status(response.status || 500);
    res.json(response.data || { error: e.message });
  }
});

module.exports = app;
