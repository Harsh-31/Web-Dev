let request = require("request");
let fs = require("fs"); //fs is inbuilt module of node js in file system
let AllMatchRef = require("./allMatches.js");
let MatchRef = require("./allMatches");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/_/id/8039/season/2015/icc-cricket-world-cup";
console.log("Request Send");
request(url,cb);

function cb(err, header, body)
{
    if(err == null && header.statusCode == 200)
    {
        console.log("Received Data");
        fs.writeFileSync("main.html", body);
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
    let ch = cheerio.load(data);
    let sidebar = ch(".sidebar-widget-league-schedule.container");
    let anchor = sidebar.find(".label.blue-text.blue-on-hover");
    let link = anchor.attr("href");
    let completeLink = "https://www.espncricinfo.com" + link;    
    console.log(completeLink);

    AllMatchRef.processAllMatch(completeLink);
}


