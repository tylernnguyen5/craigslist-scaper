const request = require('request-promise');
const fs = require('fs');
const cheerio = require('cheerio');

async function main() {
    let url = "https://www.codingwithstefan.com/table-example/";
    const html = await request.get(url);

    // fs.writeFileSync('./test.html', html);

    const $ = await cheerio.load(html);

    const tableHeaders = [];
    const tableRows = [];

    $("body > table > tbody > tr ").each( (index, element) => {     // All rows in table
        
        // For headers
        if (index === 0) {
            const ths = $(element).find("th");

            ths.each( (index, element) => {
                tableHeaders.push( 
                    $(element).text().toLowerCase()
                );
            });

            return true;
        };   
        

        // For rows
        const trs = $(element).find('td');
        const tableRow = {};

        trs.each( (index, element) => {
            tableRow[tableHeaders[index]] = $(element).text();
        });

        
        tableRows.push(tableRow);
    })
    
    console.log(tableRows); 

}

main();