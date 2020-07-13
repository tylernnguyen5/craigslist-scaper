const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


// Main function
async function main() {
    let url = 'https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0';

    // CHANGEME: remove { headless: false} if you want to run in headless state
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: 'networkidle2'
    });
    
    const html = await page.content();
    const $ = cheerio.load(html);

    // Scrape


    await browser.close()
}

main();



// ---

// CHECKME
// (async () => {
//     let movieUrl = 'https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0';

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto(movieUrl, {waitUntil: 'networkidle2'});     // Tell the browser to wait till there are no more than 2 network connection for >0.5second

//     let data = await page.evaluate( () => {
//         let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
//         let ratingValue = document.querySelector('span[itemprop="ratingValue"]').innerText;

//         return {
//             title,
//             ratingValue
//         };
//     });

//     console.log(data);

//     await browser.close();
// })();