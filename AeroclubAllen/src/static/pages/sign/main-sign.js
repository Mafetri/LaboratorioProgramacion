let x = window.matchMedia("(max-width: 768px)");

let imgLeft = true;
document.querySelector("#sign-cover").onclick = () => {
	if (x.matches){
		if(imgLeft){
			document.querySelector("#sign-cover").style = "translate: 0em -35em";
			document.querySelector("#sign-cover h2").textContent = "Ingresar"
			imgLeft = false;
		} else {
			document.querySelector("#sign-cover").style = "translate: 0em 0em";
			document.querySelector("#sign-cover h2").textContent = "Registrarse"
			imgLeft = true;
		}
	} else {
		if(imgLeft){
			document.querySelector("#sign-cover").style = "translate: 25em 0em";
			document.querySelector("#sign-cover h2").textContent = "Ingresar"
			imgLeft = false;
		} else {
			document.querySelector("#sign-cover").style = "translate: 0em 0em";
			document.querySelector("#sign-cover h2").textContent = "Registrarse"
			imgLeft = true;
		}
	}
};