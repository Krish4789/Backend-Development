const fs = require("fs");           // [Top-level]
console.log("start");              // [Top-level]

setTimeout(() => {                 // [Callback - Timer Phase]
    console.log("timer 1");
}, 0);

setImmediate(() => {               // [Callback - Check Phase]
    console.log("Immediate 1");    
});

function fun() {                   // [Top-level]
    console.log("Fun");
}

fun();                             // [Top-level call]
console.log("end");                // [Top-level]
