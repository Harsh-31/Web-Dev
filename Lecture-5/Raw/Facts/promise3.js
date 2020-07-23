//VERY IMPORTANT TOPIC AND ITS DRY RUN TOO
//Internal working of then and promises

let fs = require("fs");
console.log("Before");

function scb(data)
{
    console.log("Inside then");
    console.log(data + "");
    return 10;
}

function scb1(data)
{
    console.log("Inside thenP");
    console.log(data);
}

let fReadP = fs.promises.readFile("f1.txt");
console.log(fReadP);
let thenKPromise = fReadP.then(scb);

thenKPromise
.then(scb1);