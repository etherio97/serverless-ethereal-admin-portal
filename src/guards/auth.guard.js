const service = require('../services/firebase.service');

class AuthGuard {
  canActivate() {
    return async (req, res, next) => {
      const token = req.headers['authorization']?.slice(7) || '';
      if (!token) {
        return res.status(401).json({
          error: 'unauthorized',
          message: 'required auth header',
        });
      }
      try {
        const user = await service.getUserData(token);
        req.auth = user;
        next();
      } catch (e) {
        const response = e.response || {};
        res.status(response.status || 500);
        res.json(response.data || { error: e.message });
      }
    };;
  }
}

module.exports = new AuthGuard();