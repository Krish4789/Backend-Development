const form = document.querySelector(".signup-form");
const titleInput = document.querySelector(".form-label");
const body = document.querySelector("body");

console.log(form);
console.log(titleInput);

form.addEventListener("submit", function(ev) {
    ev.preventDefault();  

    let title = titleInput.value;

    console.log(title);
});

body.addEventListener("click" , function(ev){
    console.log(ev.target);
})

// read about key press event

