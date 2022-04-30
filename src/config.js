const {
  HEROKU_SECRET,
  VERCEL_SECRET,
  GITHUB_SECRET,
  CLOUDFLARE_SECRET,
  FIREBASE_API_KEY,
  FIREBASE_PUBLIC_KEY,
  FIREBASE_PRIVATE_KEY
} = process.env;

const HEROKU_API = 'https://api.heroku.com';

const HEROKU_BOARD = 'https://particleboard.heroku.com';

const VERCEL_API = 'https://api.vercel.com';

const GITHUB_API = 'https://api.github.com';

const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4';

const GOOGLE_IDENTITYTOOLKIT = 'https://identitytoolkit.googleapis.com';

const GOOGLE_SECURETOKEN = 'https://securetoken.googleapis.com';

const JWT_ALGORITHM = "RSA-SHA256"

module.exports = {
  HEROKU_SECRET,
  VERCEL_SECRET,
  GITHUB_SECRET,
  CLOUDFLARE_SECRET,
  FIREBASE_API_KEY,
  FIREBASE_PUBLIC_KEY,
  FIREBASE_PRIVATE_KEY
  HEROKU_API,
  HEROKU_BOARD,
  VERCEL_API,
  GITHUB_API,
  CLOUDFLARE_API,
  GOOGLE_IDENTITYTOOLKIT,
  GOOGLE_SECURETOKEN,
};
