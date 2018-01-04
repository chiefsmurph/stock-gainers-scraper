const puppeteer = require('puppeteer');
const { CronJob } = require('cron');

const scrapeYahooFinance = async (minOffset) => {
  const dateStr = (new Date()).toLocaleString();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://finance.yahoo.com/gainers');
  await page.screenshot({
    path: `./screenshots/gainers/${dateStr} (+${minOffset}).png`,
    fullPage: true
  });
  await page.goto('https://finance.yahoo.com/most-active');
  await page.click('#scr-res-table thead th:nth-child(6)'); // %change th
  await page.waitFor(200);
  await page.click('#scr-res-table thead th:nth-child(6)'); // order high to low
  await page.screenshot({
    path: `./screenshots/most-active/${dateStr} (+${minOffset}).png`,
    fullPage: true
  });
  await page.goto('https://finance.yahoo.com/trending');
  await page.screenshot({
    path: `./screenshots/trending/${dateStr} (+${minOffset}).png`,
    fullPage: true
  });
  await browser.close();
};

new CronJob('14 00 * * 1-5', () => {

  [0, 3, 5, 10, 20, 30, 60, 75, 90, 105, 120, 180].forEach(min => {
    setTimeout(async () => {
      console.log(`scraping stock gainers for 6:31am + ${min} minutes`);
      await scrapeYahooFinance(min);
    }, min * 1000 * 60);
  });

}, null, true);
