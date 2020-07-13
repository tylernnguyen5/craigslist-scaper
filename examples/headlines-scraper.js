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
    // Biggest headline - $('h2.screaming-banner-text').text()

    // document.querySelector("#intl_homepage1-zone-1 > div.l-container > div > div.column.zn__column--idx-[i] > ul > li:nth-child(3) > article > div > div > h3 > a > span.cd__headline-text")

    $("section#intl_homepage1-zone-1 > div.l-container > div").each( (index, element) => {     // Target each column (div.column.zn__column--idx-[i]) in the #intl_homepage1-zone-1
        $(element).find("div > ul > ")

        // console.log(element.text());
    });


    headlines = $("section#intl_homepage1-zone-1 > div.l-container > div >").each(
      (index, element) => {
        headline = element.text();

        console.log(headline);
      }
    );



    await browser.close()
}

main();
