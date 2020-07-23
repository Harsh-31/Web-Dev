//callbacks
let fs = require("fs");
fs.readFile("f1.txt", scb);
function scb(err, data){
    console.log("Inside then");
    console.log(data + "");
}