let fs = require("fs");
console.log("Before");
let fReadP = fs.promises.readFile("f1.txt");
console.log(fReadP);

setTimeout(function(){
    console.log("-----------------------------------------------------------");
    console.log("In Future");
    console.log(fReadP);
}, 1000)