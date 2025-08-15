const fs = require("fs");

// Parse so that data will change again to object 

fs.readFile("./result.json", "utf8", function(err, data1) {
    if (err) return console.log("Error", err);
    let users = JSON.parse(data1);
    console.log("Done");
    console.log(users[1]);
})