const puppeteer = require('puppeteer');


(async () => {
    try {

        let url = 'https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0';

        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox'
            ],
            ignoreDefaultArgs: ['--disable-extensions']
        });

        const context = await browser.createIncognitoBrowserContext();

        const page = await context.newPage();

        await page.goto(url, {waitUntil: 'networkidle2'});

        await page.screenshot({path: 'example.png'});
      
        
        await context.close();
        await browser.close();

    } catch (error) {
        console.log(error)
    }
})();



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