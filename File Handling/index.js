const fs = require("fs");


// Wrtie 

/* You are creating a function writeFile() --> path then data */

fs.writeFile("./data.txt","hello world", function(err){
    if(err) return console.log(err)
        console.log("data written")
})

fs.writeFile("./data1.txt","Baby ", function(err){
    if(err) return console.log(err)
        console.log("data written")
})

// write file override complete file 

// not to override complete file 

fs.appendFile("./data1.txt","Ahhhh ", function(err , data){
    if(err) return console.log(data)
        console.log("data written")
})