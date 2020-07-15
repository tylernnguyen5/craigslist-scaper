const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


// Main function
async function main() {
	let url = "https://www.cnn.com";

	const browser = await puppeteer.launch();

	const page = await browser.newPage();

	await page.goto(url, {
		waitUntil: 'networkidle2'
	});
	
	const html = await page.content();
	const $ = cheerio.load(html);

	// Scrape
	$("section#intl_homepage1-zone-1 > div > div > div > ul > li > article > div > div > h3 > a").each( (index, element) => {
		let href = $(element).attr("href");
		let headline = $(element).find("span.cd__headline-text").text();

		console.log(`Headline: ${headline}`);
		console.log(`URL: ${url}${href}`);
		console.log("\n");
	});

	await browser.close()
}

main();