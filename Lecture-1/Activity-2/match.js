let request = require("request");
let fs = require("fs"); //fs is inbuilt module of node js in file system
let cheerio = require("cheerio");
let path = require("path");
//let url = "https://www.espncricinfo.com/series/8039/scorecard/656471/new-zealand-vs-bangladesh-37th-match-pool-a-icc-cricket-world-cup-2014-15"
//console.log("Request Send");
function processMatch(url) //this url will be fetch from allmatches.js file
{
    console.log("Request Send");
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

function parsehtml(body)
{
    let ch = cheerio.load(body);
    let matchResultElement = ch(".desc.text-truncate");
    console.log(matchResultElement.text().trim());
    let matchSummaryElem = ch(".summary span");
    console.log(matchSummaryElem.text().trim());
    let cardsElems = ch(".card.content-block.match-scorecard-table .Collapsible");
    // console.log(cardsElems.length);
    // fs.writeFileSyn("innings.html", cardsElems);
    //console.log("Innings file saved");
    console.log("#########################################################################################");
    for(let i = 0; i < cardsElems.length; i++)
    {
        let teamNameElem = ch(cardsElems[i]).find("h5");
        let cTeam = teamNameElem.text();  
        cTeam=cTeam.split("Innings")[0];
        cTeam=cTeam.trim();
        console.log(cTeam);
        console.log(teamNameElem.text().trim());
        let AllRows = ch(cardsElems[i]).find(".table.bowler tbody tr");
        for(let j = 0; j < AllRows.length; j++)
        {
            let AllCols = ch(AllRows[j]).find("td");
           // if(AllCols.length > 1)   //her we are ignoring commentries of the match
            {
                //player wali row
                let cols = ch(AllRows[j]).find("td");
                let bowlername = ch(cols[0]).text().trim();
               // console.log(batsman);
                //let runs = ch(AllRows[j]).find(".font-weight-bold").text();
                let overs = ch(cols[1]).text().trim();
                let maiden = ch(cols[2]).text().trim();
                let runs = ch(cols[3]).text().trim();
                let wickets = ch(cols[4]).text().trim();
                let econ = ch(cols[5]).text().trim();
                let wd = ch(cols[6]).text().trim();
                let nb = ch(cols[7]).text().trim();

                console.log(`Teams: ${cTeam} Name: ${bowlername} Overs: ${overs} Maiden: ${maiden} Runs: ${runs} Wickets: ${wickets} ECON: ${econ} WD: ${wd} NB: ${nb}`);
                processPlayer(cTeam, bowlername, overs, maiden, runs, wickets, econ, wd, nb);
            }
        }
        console.log("---------------------------------------------------------------------------------------")
    }
} 

module.exports = {
    processMatch : processMatch
}

function checkIfDirExist(dest)
{
    return fs.existsSync(dest);
}
function checkIfFileExist(dest)
{
    return fs.existsSync(dest);
}
function createDir(dest)
{
    return fs.mkdirSync(dest);
}

function processPlayer(bTeam, bowlername, overs, maiden, runs, wickets, econ, wd, nb)
{
    //1.check => bteam folder 
    let filePath = path.join(bTeam, bowlername + ".json");
    let details = {
        Overs: overs,
        Maiden: maiden,
        Runs: runs,
        Wicket: wickets,
        ECON: econ,
        WD: wd,
        NB: nb
    }
    let dirPath = bTeam; //bTeam => baller team
    let dirExist = checkIfDirExist(dirPath);
    if(dirExist)
    {
        //yes => check palyer ki file
        //yes => update
        //create => data enter
        let entries;
        let fileExist = checkIfFileExist(filePath);
        if(fileExist)
        {
            //update files
            let content = fs.readFileSync(filePath);
            entries  =JSON.parse(content);
            entries.push(details);
        }
        else
        {
            //create file
            entries = [];
            entries.push(details);
        }
        let data = JSON.stringify(entries);
        fs.writeFileSync(filePath, data);
    }
    else
    {
        //No => create folder
        createDir(dirPath);
        //create file and add data
        let entries = [];
        entries.push(details);
        let data = JSON.stringify(entries);
        fs.writeFileSync(filePath, data);
    }
}