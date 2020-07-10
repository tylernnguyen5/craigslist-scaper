const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {
    let url = "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof";
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const html = page.content();

    const $ = cheerio.load(html);

    // Object
    const results = $(".result-info")
        .map( (index, element) => {
            const titleElement = $(element).find(".result-title");
            const timeElement = $(element).find(".result-date");

            const title = $(titleElement).text();
            const url = $(titleElement).attr("href");
            const datePosted = new Date($(timeElement).attr("datetime"));
            const neighborhood = $(element).find(".result-hood").text()
                .trim()
                .replace("(", "")
                .replace(")", "");

            return { title, url, datePosted, neighborhood };
        })
        .get();

    console.log(results);
}

main();