function LibFn()
{
    console.log("I am ib fn");
}
function somefn()
{
    console.log("I am another fn");
}
function privatefn()
{
    console.log("I don't want to be exported");
}
let a = 10;
let secret = 100;
module.exports = {  //module.export is used to export one file to another
    LibFn : LibFn, // key : function === key can be named anything 
    Another : somefn,
    a : a
}