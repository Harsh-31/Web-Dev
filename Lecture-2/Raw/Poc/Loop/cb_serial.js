let fs = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt"];

function serialReader(i) {
    if (i == files.length) {
        return;
    }
    fs.readFile(files[i], function (err, content) {
        console.log("Content " + content);
        serialReader(i + 1);
    })
}
serialReader(0);


// In serial we can't use for and while loops
// let i=0;

// while (i < files.length) {
//     fs.readFile(files[i], function (err, content) {
//         console.log("Content " + content);
//         i++;
//     })
//     console.log("Now i am stuck");
// }