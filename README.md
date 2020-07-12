# Craigslist Scraper 

The application will access the website called **Craigslist in San Francisco Bay Area**, look into the list of jobs for **software/qa/dba/etc** and then scrape the `title, date posted, neighborhood, URL, job description and compensation (if available)` of each listing. 

The data will then be stored inside a MongoDB database after you stop the program. I used [MLab](https://mlab.com/) to set up the database.


## Demo

![Demo GIF](https://gph.is/1mvaIqy)

## Dependeices 

- Nodejs 
- [Puppeteer](https://pptr.dev/)
- Cheerio
- NoSQL MongoDB
