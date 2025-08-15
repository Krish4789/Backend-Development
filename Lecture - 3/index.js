// This is called Common JS

let utilfunction = require("./utilfunction"); // this run the whole package inside the utilfunction

console.log("Add:", utilfunction.add(10, 5));  
console.log("Sub:", utilfunction.sub(10, 5));  
console.log("Mul:", utilfunction.mul(10, 5)); 

console.log("Module Exports:", utilfunction);

console.log("Div:", utilfunction.div(10, 5));  
