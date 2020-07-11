const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

// DB Credentials - MLab
// username: craigslist_user0
// password: superstrong1

async function connectToMongoDb() {
    await mongoose.connect(
        "mongodb+srv://craigslist_user0:superstrong1@aws-sydney0.xfteb.mongodb.net/craigslistlistings?retryWrites=true&w=majority",
        { useNewUrlParser: true }
    );

    console.log("Connected to MongoDB");
}

async function scrapeListings(page) {
    let url = "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof";
    
    await page.goto(url);

    const html = await page.content();

    const $ = cheerio.load(html);

    // Array of Objects
    const listings = $(".result-info")
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

    return listings
}


async function scrapeJobDescription(listings, page) {
    for (let i = 0; i < listings.length; i++) {
        await page.goto(listings[i].url);
        
        const html = await page.content();
        const $ = cheerio.load(html);

        const jobDescription = $("#postingbody").text();
        const compensation = $(".attrgroup > span:nth-child(1) > b").text();

        listings[i].jobDescription = jobDescription;
        listings[i].compensation = compensation;

        await sleep(1000); // 1 second sleep
    } 
}


async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


async function main(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const listings = scrapeListings(page);

    const listingsWithJobDescription = scrapeJobDescription(listings, page);


    console.log(listings);

    
    await browser.close()
}

main();