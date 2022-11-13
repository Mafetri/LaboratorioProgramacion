const contactForm = document.querySelector('.form');
let name = document.querySelector('#name');
let email = document.querySelector('#email');
let message = document.querySelector('#message');

console.log("hola");

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        message: message.value
    }

    console.log(formData);
})