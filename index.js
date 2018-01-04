const puppeteer = require('puppeteer');
const { CronJob } = require('cron');

const scrapeGainers = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://finance.yahoo.com/gainers');
  await page.screenshot({
    path: './screenshots/' + (new Date()).toLocaleString() + '.png',
    fullPage: true
  });
  await browser.close();
};

new CronJob('31 06 * * 1-5', () => {

  [0, 3, 5, 10, 20, 30, 60, 75, 90, 105, 120, 180].forEach(min => {
    setTimeout(async () => {
      console.log(`scraping gainers for 6:31am + ${min} minutes`);
      await scrapeGainers();
    }, min * 1000 * 60);
  });

}, null, true);
