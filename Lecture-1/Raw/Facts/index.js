console.log("Hello All");
//Dynamically typed lang
//types=> nu,ber, string, boolean, undefined, null
let varname;
console.log(varname);
varname = "I am a string";
console.log(varname);
varname = null;
console.log(varname);
//Java similar syntax => for,while, if, else, switch, classes, arrays
//isPrime
let num = 23;
for(let div = 2; div * div <= num; div++)
{
    if(num % div == 0)
    {
        console.log("Not prime");
    }
}

console.log("Prime");
//to run => node index.js