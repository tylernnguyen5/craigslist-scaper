const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://boost.dev');
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({
        path: 'kuikaBoost.png'
    });
    await browser.close();
})();