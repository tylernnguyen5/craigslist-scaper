const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Listing = require('./model/Listing');

// Function to the MongoDB
async function connectToMongoDb() {
    await mongoose.connect(
        // CHANGEME: change the credentials to specific database
        "mongodb+srv://craigslist_user0:superstrong1@aws-sydney0.xfteb.mongodb.net/craigslistlistings?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log("Connected to MongoDB");
}

// Function to scrape the title, posted date, URL and neighborhood of each listing
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

// Function to scrape the job description and compensation (if available) of each listing
async function scrapeJobDescription(listings, page) {
    for (let i = 0; i < listings.length; i++) {     // I don't user .each because each page needs to be loaded in order to scrape the job description and compensation
        await page.goto(listings[i].url);
        
        const html = await page.content();
        const $ = cheerio.load(html);

        const jobDescription = $("#postingbody").text();
        const compensation = $(".attrgroup > span:nth-child(1) > b").text();

        listings[i].jobDescription = jobDescription;
        listings[i].compensation = compensation;

        // Save data to the Listing model
        const listingModel = new Listing(listings[i]);

        await listingModel.save();

        await sleep(1000); // 1 second sleep
    } 
}

// Sleep function
async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Main function
async function main(){
    await connectToMongoDb();

    // CHANGEME: remove { headless: false} if you want to run in headless state
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const listings = await scrapeListings(page);

    await scrapeJobDescription(listings, page);

    console.log(listings);

    await browser.close()
}

main();