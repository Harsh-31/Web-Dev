//function definition => code
function myfn(param)
{
    console.log(param);
    param();
    //return "some value";
    return undefined;
}
myfn(function smaller()
{
    console.log("I am smaller");
})
//function call
//let rval = myfun("Steve");
//myfn([1, 2, 3, 4, 5]);
//myfn(10);
//myfn(null);
//console.log(rval);
//fn are variables
//variables can be passed as parameters to a fn
//functions can be passed as parameters to a fn

//you can assign values/ address of a variable to a variable
//you can assign address of an fn to a variable
//let a = 10'
//let b = a;
//console.log(a);

let greeter = function sayhi()
{
    console.log("Hello All");
}

greeter();



