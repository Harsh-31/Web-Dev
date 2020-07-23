let fs = require("fs");
let files = ["f1.txt", "f2.txt", "f3.txt","f4.txt"];
let f1p = fs.promises.readFile("f1.txt");
for (let i = 1; i < files.length; i++) {
    f1p = f1p.then(function (data) {
        console.log(data + "");
        let nfp = fs.promises.readFile(files[i]);
        return nfp;
    })
}
f1p.then(function(data){
    console.log(data + "");

})