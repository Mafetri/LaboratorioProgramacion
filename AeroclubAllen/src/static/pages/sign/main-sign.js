let imgLeft = true;
document.querySelector("#sign-cover").onclick = ()=>{
	if(imgLeft){
		document.querySelector("#sign-cover").style = "translate: 35em 0em";
		document.querySelector("#sign-cover h2").textContent = "Ingresar"
		imgLeft = false;
	} else {
		document.querySelector("#sign-cover").style = "translate: 0em 0em";
		document.querySelector("#sign-cover h2").textContent = "Registrarse"
		imgLeft = true;
	}
}