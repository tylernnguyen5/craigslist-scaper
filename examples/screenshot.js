const puppeteer = require('puppeteer');

// This small program will take a screenshot of the home page of CNN news site
(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({    // Standard viewport size
      width: 1366,
      height: 768,
      isLandscape: true,
    });

    await page.goto("https://www.cnn.com/");

    // Wait for the page finishing loading
    await page.evaluateHandle('document.fonts.ready');

    // Screenshot
    const datetime = new Date();

    await page.screenshot({
        path: `screenshots/cnn-${datetime.toISOString()}.png`
    });

    await browser.close();
})();