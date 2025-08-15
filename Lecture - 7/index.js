let age = 20; 

let p = new Promise((resolve, reject) => {
  if (age > 18) {
    resolve("OK");
  } else {
    reject("Not");
  }
});

// p.then(
//   function(data) {
//     console.log("Resolved:", data); 
//   },
//   function(err) {
//     console.log("Rejected:", err);
//   }
// );

p.then((data) => {
  console.log("Resolved:", data);
}).catch((err) => {
  console.log("Rejected:", err);
});