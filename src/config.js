const { 
  HEROKU_SECRET,
  VERCEL_SECRET,
  GITHUB_SECRET,
  CLOUDFLARE_SECRET,
} = process.env;

const HEROKU_API = 'https://api.heroku.com';

const HEROKU_BOARD = 'https://particleboard.heroku.com';

const VERCEL_API = 'https://api.vercel.com';

const GITHUB_API = 'https://api.github.com';

const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4';

module.exports = {
  HEROKU_SECRET,
  VERCEL_SECRET,
  GITHUB_SECRET,
  CLOUDFLARE_SECRET,
  HEROKU_API,
  HEROKU_BOARD,
  VERCEL_API,
  GITHUB_API,
  CLOUDFLARE_API,
};
