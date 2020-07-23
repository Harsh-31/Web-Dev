let request = require("request");
let fs = require("fs"); //fs is inbuilt module of node js in file system
let MatchRef = require("./match");
let cheerio = require("cheerio");
//let url = "https://www.espncricinfo.com/scores/series/8039/season/2015/icc-cricket-world-cup?view=results";
console.log("Request Send");
function processAllMatch(url)
{
     request(url, cb);
}

function cb(err, header, body)
{
    if(err == null && header.statusCode == 200)
    {
        console.log("Received Data");
        fs.writeFileSync("match.html", body);
        parsehtml(body);
    }
    else if(header.statusCode == 404)
    {
        console.log("url not found");
    }
    else
    {
        console.log(err);
        console.log(header);
    }
}

function parsehtml(data)
{
    let ch = cheerio.load(data); //by console.load(data) ---> HTML data will be loaded 
    let cards = ch(".col-md-8.col-16");
    for(let i = 0; i < cards.length; i++)
    {
        let anchorsArr = ch(cards[i]).find(".match-cta-container a");
        let link = ch(anchorsArr[0]).attr("href");
        //console.log(link);
        let completeLink = "https://www.espncricinfo.com" + link;
        MatchRef.processMatch(completeLink);
    }
    
}

module.exports = {
    processAllMatch : processAllMatch
}
