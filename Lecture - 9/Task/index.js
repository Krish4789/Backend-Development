const fs = require("fs");

fs.readFile("./result.json", "utf8", function (err, data1) {
    if (err) return console.log("Error", err);
    console.log("Done");
    let partialdata1 = JSON.parse(data1);

    fs.readFile("./userdata.json", "utf8", function (err, data2) {
        if (err) return console.log("Error", err);
        console.log("Success");
        let partialdata2 = JSON.parse(data2);

        // Two combine two different array: --------------------->

        // use SPREAD OPERATOR 

        let combinedData = [...partialdata1, ...partialdata2];

        // let combinedData = {
        //     result: partialdata1,
        //     user: partialdata2
        // };

        // 2nd method is to concat

        // let allusers = partitaldata1.concat(partialdata2);

        fs.writeFile("./result.txt", JSON.stringify(combinedData), function (err) {
            if (err) return console.log("Error", err);
            console.log("Again Success");
        });
    });
});
