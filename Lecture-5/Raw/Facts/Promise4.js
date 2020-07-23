let fs = require("fs");
console.log("Before");
function scb(data) {
    console.log("Inside then");
    console.log(data + "");
    let  fp=fs.promises.readFile("f2.txt");
    return fp;
}
function scb1(data) {
    console.log("Inside thenP")
    console.log(data)
}
let fReadP = fs.promises.readFile("f1.txt");
console.log(fReadP);
let thenkPromise = fReadP.then(scb);

thenkPromise
    .then(scb1)