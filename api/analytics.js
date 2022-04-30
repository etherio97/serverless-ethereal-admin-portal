const { default: axios } = require('axios');
const UAParser = require('ua-parser-js');
const app = require('../src/app');

const reportTo = (text, disable_notification = false) => 
  axios
    .post('https://api.telegram.org/bot' + process.env.TELEGRAM_BOT + '/sendMessage', {
      chat_id: 2040191682,
      text,
      disable_notification,
      parse_mode: 'markdown',
    })
    .then(({ data }) => data)
    .catch(error => ({ error }));

const getIpDetails = (ip) =>
  axios
  .get('https://ipinfo.io/' + ip + '/json')
  .then(result => {
    delete result.data.readme;
    return result.data;
  })
  .catch(() => ({
    ip, 
    city: 'N/A', 
    region: 'N/A', 
    country: 'N/A', 
    org: null,
    timezone: null
  }));

app.all('*', async (req, res) => {
  let ua = req.headers['user-agent'];
  let ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  let dev = new UAParser(ua);
  let info = await getIpDetails(ip);
  let text = [];
  let { model, type } = dev.getDevice();
  text.push('Someone is trying to access ```', req.originalUrl, '``` ');
  
  if (!['console', 'embeded'].includes(type)) {
    let os = dev.getOS();
    text.push('by using ', dev.vendor, ' ', os.name, ' version ', os.version);
  }
  text.push(
    'from ip: ```', ip, '``` (```', info.org, '```)',
    ' at **', info.city, '**, **', info.country, '** ',
  );
  await reportTo(text.join(''));
  res.redirect('https://google.com');
  res.end();
});

module.exports = app;