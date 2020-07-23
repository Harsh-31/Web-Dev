let obj = {
    firstname: "Steve",
    lastname: "Rogers",
    age: 45,
    isAvenger: true,
    movies: ["First Avenger", "Civil War"],
    address: {
        city: "New York",
        state: "Manhetten"
    }
}
//console.log(obj);
//console.log(obj.firstname);
//console.log(obj.movies[1]);
//console.log(obj["age"]);
//add key
//obj.friends = ["tonny", "Bruce"];
//update
//obj.age = 46;
//delete
//delete obj.isAvenger
//console.log(obj);

function updateObj(prop, value)
{
    obj[prop] = value;
}
updateObj("isAvenger", false);
updateObj("age", 104);
console.log(obj);