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
    const datetime = new Date().toISOString()
      .replace('T', '--')
      .replace(/:/g, '-')
      .slice(0 , -5);

    await page.screenshot({
      path: `../screenshots/cnn-${datetime}.png`
    });

    console.log("Check \"screenshots\" directory for captured screenshot");
    await browser.close();
})();