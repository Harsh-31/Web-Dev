let fs = require("fs");
let rfp = fs.promises.readFile("f1.txt");
let sfp = fs.promises.readFile("f2.txt");
rfp
    .then(function (data) {
        console.log("Inside then")
        console.log(data);
    })
sfp
.then(function (data) {
    console.log("Inside thenKP");
    console.log(data);

})