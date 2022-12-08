
const user = await (await fetch("/api/userLoggedin")).json();

fillUserCard();
function fillUserCard(){
    const userCard = document.querySelector("#user-card-info");
    let dni = document.createElement("h2");
    dni.textContent = "DNI: " + user.dni;
    
    let name = document.createElement("h2");
    name.textContent = "Nombre: " + user.name + " " + user.surname;
    
    let email = document.createElement("h2");
    email.textContent = "Email: " + user.email;
    
    let role = document.createElement("h2");
    role.textContent = "Rol: " + roleTranslation(user.role);
    
    let phone = document.createElement("h2");
    phone.textContent = "Telefono: " + user.phone;

    let modifyButton = document.createElement("button");
    modifyButton.classList.add("modify-button");
    modifyButton.textContent = "Modificar"
    
    userCard.append(dni);
    userCard.append(name);
    userCard.append(email);
    userCard.append(role);
    userCard.append(phone);
    userCard.append(modifyButton);
}

// If he is an admin
if(user.role == "admin" || user.role == "editor"){
    const userSection = document.querySelector("#user");

    let dashboardButtonA = document.createElement("a");
    dashboardButtonA.href = "/dashboard";
    dashboardButtonA.classList.add("margin-auto");
    let dashboardButton = document.createElement("button");
    dashboardButton.classList.add("boton-sec-oscuro");
    dashboardButton.textContent = "Ir al Dashboard";

    dashboardButtonA.append(dashboardButton)
    userSection.append(dashboardButtonA);
}


function roleTranslation(role){
	switch(role){
		case 'admin': return "Administrador";
		case 'editor': return "Editor";
		case 'pilot': return "Piloto";
		case 'student': return "Alumno";
	}
}

