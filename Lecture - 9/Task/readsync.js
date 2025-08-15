const fs = require("fs");

let data1 = fs.readFileSync("./result.json" , "utf-8");
let data2 = fs.readFileSync("./userdata.json" , "utf-8");

let array1 = JSON.parse(data1);
let array2 = JSON.parse(data2);

let combine = [...array1, ...array2];
try {
fs.writeFileSync("./sync" , JSON.stringify(combine));
console.log("hey");

} catch (error)
{
    console.log(error);
}