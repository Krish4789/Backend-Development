let changecolorbtn = document.querySelector(".form-button");
let stopbtn = document.getElementById("stop-btn");
let body = document.querySelector("body");

let colors = [
    "green",
    "blue",
    "red", 
    "black", 
    "white",
    "purple", 
    "grey", 
    "yellow", 
    "orange", 
    "lime"
];

let intervalId;

function changecolor() {
    let i = Math.floor(Math.random() * colors.length);
    body.style.background = colors[i];
}

function startColorChange() {
    if (intervalId) return; 
    intervalId = setInterval(changecolor, 1000);
}

function stopColorChange() {
    clearInterval(intervalId);
    intervalId = null;
}

changecolorbtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    changecolor();
    startColorChange();
});

stopbtn.addEventListener("click", stopColorChange);

setTimeout(startColorChange, 1000);
