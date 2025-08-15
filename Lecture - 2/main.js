const fs = require("fs");            // Core module to work with file system

console.log("start");                //  Top-level code: executes first

setTimeout(() => {                   // Timer callback (macrotask): goes to timer phase
    console.log("timer 1");
}, 0);

setImmediate(() => {                 // setImmediate callback: goes to check phase
    console.log("Immediate 1");
});

fs.readFile("demo.txt", "utf-8", (err, data) => {   // I/O operation: goes to poll phase
    if (err) return console.log(err);

    console.log(data);               // Once I/O complete, this callback runs

    setTimeout(() => {               // New timer scheduled inside I/O callback
        console.log("timer 2");
    }, 0);

    setImmediate(() => {             // New immediate scheduled inside I/O callback
        console.log("Immediate 2");
    });
});

function fun() {                     // Declaring a function
    console.log("Fun");              // Just logs "Fun"
}

fun();                               // Executes immediately (top-level code)
console.log("end");                  // Executes immediately (top-level code)

function mul(a,b) {
    return new Promise((resolve , reject) => {

        if(a>10)
        {
            setTimeout(() => {
                resolve(a*b)
            },0)
        }

        else reject("a is less than 10");
    })
}

mul(11 , 6).then((data) => {
    console.log(data);
})

.catch(err)
{
    console.log(err);
}