require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');

const URLs = process.env.URLS.split(',');

const CronExpression = {
  EVERY_14_MINUTES: '0 */14 * * * *',
};

cron.schedule(CronExpression.EVERY_14_MINUTES, async () => {
  await Promise.all(URLs.map((url) => getHealth(url)));
});

async function getHealth(URL) {
  try {
    const res = await axios.get(URL);
    console.log('🚀 ~ file: index.js:19 ~ res.data:', res.data);
    return res.data;
  } catch (error) {
    console.log('🚀 ~ file: index.js:23 ~ error:', error);
  }
}
