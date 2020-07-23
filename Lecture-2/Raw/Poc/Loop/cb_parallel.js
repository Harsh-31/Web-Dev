let files = ["../f1.txt", "../f2.txt", "../f3.txt"];
let fs=require("fs");
function parallelReader(i) {
    if (i == files.length) {
        return;
    }
    fs.readFile(files[i], function (err, content) {
        console.log("Content " + content);
    })
    parallelReader(i + 1);
}
parallelReader(0);

// in parallel we can use loops
/*let i = 0;
while (i < files.length) {
    fs.readFile(files[i], function (err, content) {
        console.log("Content " + content);
    })
    i++;
    console.log("Now i am stuck");
} */