let fs = require("fs");
console.log("Before");
//async function => serial
fs.readFile("f1.txt", f1cb);
function f1cb(err, content)
{
    console.log("Content: " + content);
    console.log("f1 ka after");
    fs.readFile("f2.txt", f2cb);
}
function f2cb(err, content)
{
    console.log("Content: " + content);
    console.log("f2 ka after");
    fs.readFile("f3.txt", f3cb);
}
function f3cb(err, content)
{
    console.log("Content: " + content);
    console.log("f3 ka after");
}
console.log("After");

//serial => one after another => f1 => f2 read => dependent
//parallel => multiple task simultaneously f1,f2 
