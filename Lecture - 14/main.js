/*
----------------------------------------- Query Selector ----------------------------------------
*/

// Select element by ID
let el5 = document.querySelector("#main-heading"); // # for ID
console.log(el5);

// Select the first element with class "User-name"
let el6 = document.querySelector(".User-name"); // . for class
console.log(el6);

// Select all elements with class "User-name"
let el7 = document.querySelectorAll(".User-name"); // Returns NodeList
console.log(el7);

// Select the <ul> element with class "User-List"
let userList = document.querySelector(".User-List");

// Select the first <p> tag (e.g., description paragraph)
let el8 = document.querySelector("p");
console.log(el8);

/*
----------------------------------------- Properties ----------------------------------------
1) innerText      -> Gets only *visible* text (respects CSS)
2) innerHTML      -> Gets HTML inside the element (including tags)
3) textContent    -> Gets all text (even hidden by CSS)
*/

// Use console.dir to explore properties of an element
console.dir(el8);

// innerText
let content = el8.innerText;
console.log("innerText:", content);

// innerHTML
let htmlContent = el8.innerHTML;
console.log("innerHTML:", htmlContent);

// textContent
let fullText = el8.textContent;
console.log("textContent:", fullText);

// Another example using userList
let userListText = userList.innerText;
console.log("User list (innerText):", userListText);

let userListHTML = userList.innerHTML;
console.log("User list (innerHTML):", userListHTML);

let userListContent = userList.textContent;
console.log("User list (textContent):", userListContent);

/*
----------------------------------------- Bonus Examples ----------------------------------------
*/

// Changing content dynamically
el5.innerText = "Welcome to the User Page!"; // change heading text
el6.innerHTML = "<strong>Krish (Admin)</strong>"; // make first name bold

// Adding new user dynamically
userList.innerHTML += "<li class='User-name'>New User</li>"; // to add more than one use ''


