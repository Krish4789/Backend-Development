const fs = require('fs');

let user = [
    {
        id: 1,
        name: "Nitesh",
        email: "Nitesh1234@gmail.com",
        address: "Delhi",
        password: "12345"
    },
    {
        id: 2,
        name: "Krish",
        email: "krishmittal@gmail.com",
        address: "Karnal",
        password: "abcd1234"
    },
    {
        id: 3,
        name: "Aastha",
        email: "aastha.gupta@email.com",
        address: "Mumbai",
        password: "password@321"
    },
    {
        id: 4,
        name: "Jigyasa",
        email: "jigyasa.coolgirl@gmail.com",
        address: "Pune",
        password: "love123"
    },
    {
        id: 5,
        name: "Rohan",
        email: "rohan2000@gmail.com",
        address: "Bangalore",
        password: "pass5678"
    }
];

// JSON CHANGE OBJECT TO STRING -- > STRINFIFY FOR VICE VERSA --> PARSE

// FOR READABLE FORMAT CREATE JSON FILE

fs.writeFile("./result.json", JSON.stringify(user), function(err) 
   {
            if (err) return console.log("Error", err);
            console.log("Success");
    });

