const { myread, mywrite } = require("./io");

async function task() {
  try {
    let data1 = await myread("./data.txt");
    let data2 = await myread("./demo.txt");

    let res = [...data1, ...data2];

    let message = await mywrite("./res.txt", res); 
    console.log(message); 

  } catch (error) {
    console.log("An error occurred:", error);
  }
}

task();