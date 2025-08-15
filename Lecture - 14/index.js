// Accessing DOM Element 

/*
----------------------------------------- Using Id ----------------------------------------
*/

let el1 = document.getElementById("main-heading");
console.log(el1);

/*
-------------------------------------------Using Id --------------------------------------
*/

let el2 = document.getElementsByClassName("User-name");
console.log(el2[1]);

let el3 = document.getElementsByClassName("User-description");
console.log(el3);  // Collection 
console.log(el3[0]);

/*
-------------------------------------------Tag name --------------------------------------
*/

let el4 = document.getElementsByTagName("p");
console.log(el4);