const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


// Main function
async function main() {
		let url = "https://www.cnn.com/";

		const browser = await puppeteer.launch();

		const page = await browser.newPage();

		await page.goto(url, {
			waitUntil: 'networkidle2'
		});
		
		const html = await page.content();
		const $ = cheerio.load(html);

		// Scrape
		$("section#intl_homepage1-zone-1 > div > div > div > ul > li > article > div > div > h3 > a > span.cd__headline-text").each( (index, element) => {
			headline = $(element).text();

			console.log(headline);
		});

		await browser.close()
}

main();