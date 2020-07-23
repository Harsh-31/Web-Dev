let fs = require("fs");
console.log("Before");
let fReadP = fs.promises.readFile("f1.txt");
let f2ReadP = fs.promises.readFile("f2.txt");
console.log("Attached Then");
fReadP.then(function (data) {
    console.log("Inside then");
    console.log("Data " + data);

})
console.log("Attached Catch")
fReadP.catch(function (err) {
    console.log("Inside catch");
    console.log(err);
})
console.log("Attached Then");
f2ReadP.then(function (data) {
    console.log("Inside then");
    console.log("Data " + data);

})
console.log("Attached Catch")
f2ReadP.catch(function (err) {
    console.log("Inside catch");
    console.log(err);
})
console.log("After");
console.log("````````````````````````````````````````````````");

