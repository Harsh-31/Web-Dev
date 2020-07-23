let fs = require("fs");
let rfp = fs.promises.readFile("f1.txt");
let thenkP = rfp
    .then(function (data) {
        console.log("Inside then")
        console.log(data);
        return 10;
    })

thenkP.then(function (data) {
    console.log("Inside thenKP");
    console.log(data);

})