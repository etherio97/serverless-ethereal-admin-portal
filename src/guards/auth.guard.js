const service = require('../services/firebase.service');
const { verify, decode } = require('../utils/helpers');

class AuthGuard {
  canActivate() {
    return async (req, res, next) => {
      const auth = (req.auth = {
        idToken: req.headers['authorization']?.slice(7) || '',
        currentUser: null,
      });
      if (!auth.idToken) {
        return res.status(401).json({
          error: 'unauthorized',
          message: 'required auth header',
        });
      }
      try {
        if (verify(auth.idToken)) {
          auth.currentUser = decode(auth.idToken);
          if (Date.now() / 1000 > auth.currentUser.exp) {
            return res.status(401).json({ error: 'token expired' });
          }
        } else {
          return res.status(400).json({ error: 'invalid token' });
        }
        // auth.currentUser = await service.getUserData(auth.idToken);
        next();
      } catch (e) {
        const response = e.response || {};
        res.status(response.status || 500);
        res.json(response.data || { error: e.message });
      }
    };
  }
}

module.exports = new AuthGuard();
