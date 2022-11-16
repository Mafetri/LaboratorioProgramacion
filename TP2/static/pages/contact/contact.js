const contactForm = document.querySelector(".form");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let message = document.querySelector("#message");

contactForm.addEventListener("submit", (e) => {
	e.preventDefault();

    contactForm.style.borderRadius = "10px 10px 0 0";
    document.querySelector("#form-ok").style.display = "none";
    document.querySelector("#form-error").style.display = "none";

    // Extracts the data from the html form
	let formData = {
		name: name.value,
		email: email.value,
		phone: phone.value,
		message: message.value,
	};

    // Uses XHR to post the form data
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/form");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {
        // If the server sends a success
		if (xhr.responseText == "success") {
			document.querySelector("#form-ok").style.display = "";
			name.value = "";
			email.value = "";
			phone.value = "";
			message.value = "";
		} else {
            document.querySelector("#form-error").style.display = "";
        }
	};

    xhr.send(JSON.stringify(formData))
});
