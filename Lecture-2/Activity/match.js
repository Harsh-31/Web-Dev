let request = require("request");
let fs = require("fs"); //fs is inbuilt module of node js in file system
let cheerio = require("cheerio");
let path = require("path");
let lb = []; //leaderboard
let count = 0;
//let url = "https://www.espncricinfo.com/series/8039/scorecard/656471/new-zealand-vs-bangladesh-37th-match-pool-a-icc-cricket-world-cup-2014-15"
//console.log("Request Send");
function processMatch(url) //this url will be fetch from allmatches.js file
{
    console.log("Request Send");
    count++;
    request(url, cb);
}

function cb(err, header, body)
{
    if(err == null && header.statusCode == 200)
    {
        console.log("Received Data");
        count--;
        fs.writeFileSync("match.html", body);
        parsehtml(body);
        if(count == 0)
        {
            console.table(lb);
        }
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

function parsehtml(body)
{
    let ch = cheerio.load(body);
    let matchResultElement = ch(".desc.text-truncate");
    console.log(matchResultElement.text().trim());
    let result = matchResultElement.text().trim();
    let matchSummaryElem = ch(".summary span");
    let summary = matchSummaryElem.text();
    let wt = summary.split("won")[0]; //wt ---> winning team
    wt = wt.trim();
    
    let cardsElems = ch(".card.content-block.match-scorecard-table .Collapsible");
    // console.log(cardsElems.length);
    // fs.writeFileSyn("innings.html", cardsElems);
    //console.log("Innings file saved");
    console.log("#########################################################################################");
    for(let i = 0; i < cardsElems.length; i++)
    {
        let teamNameElem = ch(cardsElems[i]).find("h5");
        let cTeam = teamNameElem.text();  //cTeam---> current team
        cTeam=cTeam.split("Innings")[0];
        cTeam=cTeam.trim();
        console.log(cTeam);
        console.log(teamNameElem.text().trim());
        if(cTeam == wt)
        {

              let AllRows = ch(cardsElems[i]).find(".table.batsman tbody tr");
              for(let j = 0; j < AllRows.length; j++)
              {
                  let AllCols = ch(AllRows[j]).find("td");
                  if(AllCols.length > 1)
                  {
                      //player wali row
                      let cols = ch(AllRows[j]).find("td");
                      let batsmanName = ch(cols[0]).text().trim();
                      // console.log(batsman);
                      //let runs = ch(AllRows[j]).find(".font-weight-bold").text();
                      let runs = ch(cols[2]).text().trim();
                      let balls = ch(cols[3]).text().trim();
                      let fours = ch(cols[5]).text().trim();
                      let sixes = ch(cols[6]).text().trim();
                      let sr = ch(cols[7]).text().trim();

                      console.log(`Teams: ${cTeam} Name: ${batsmanName} Runs: ${runs} Balls: ${balls} Fours: ${fours} Sixes: ${sixes} sr: ${sr}`);
                      processPlayer(cTeam, batsmanName, runs, balls, fours, sixes, sr);
                   }
               }
        }
        console.log("---------------------------------------------------------------------------------------")
    }
} 

module.exports = {
    processMatch : processMatch
}



function processPlayer(team, batsmanName, runs)
{
    runs = parseInt(runs);
    for(let i = 0; i < lb.length; i++)
    {
        let player = lb[i];
        if(player.name == batsmanName.name && player.Teamm == team)
        {
            //player exist
            player.Runs += runs;
            return;
        }
    }
    let obj = {
        Name: batsmanName,
        Team: team,
        Runs: runs
    }
    lb.push(obj);
}