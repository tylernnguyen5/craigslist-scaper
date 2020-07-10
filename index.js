const puppeteer = require('puppeteer');

async function main() {
    let url = "https://www.google.com";
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

}

main();