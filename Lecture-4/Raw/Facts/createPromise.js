let fs = require("fs");
// promise creater
function promisifyFs(src) {
    return new Promise(function (resolve, reject) {
        fs.readFile(src, function (err, data) {
            if (err) {
                // 
                reject(err);
            } else {
                // 
                resolve(data);
            }
        })
    })
}
// 1. return promise
// 2. then catch 
// promise user
let fReadP = promisifyFs("f1.txt");
console.log(fReadP); //Print status of promise at this point 
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
console.log("After");
console.log("````````````````````````````````````````````````");