//npm install cheerio
let fs = require("fs");
let data = fs.readFileSync("index.html");
// console.log("" + data);
let cheerio = require("cheerio");
let ch = cheerio.load(data);
//let titleTag = ch("title");
//console.log(titleTag.text());
//let h1Tag = ch("h1");
//console.log(h1Tag.text());
let allPElement = ch("div p");
//console.log(allPElement.text());
//based on id
let uniqueP = ch("#unique-id");
//console.log(uniqueP.text());
//based on class
let navli = ch(".nav");
console.log(navli.text());

//two classes same element
let thirdch = ch(".nav.third");