let fs = require("fs");
let frp = fs.promises.readFile("f1.txt");
console.log("Before");
frp.then(function (data) {
    console.log(data);
})
console.log("After");