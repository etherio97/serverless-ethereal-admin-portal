const service = require('../services/firebase.service');

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
        auth.currentUser = await service.getUserData(auth.idToken);
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
