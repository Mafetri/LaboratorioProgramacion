
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

// Dashboard Button
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

// All turns
if(user.role == "admin" || user.role == "instructor"){
    const userSection = document.querySelector("#user");

    let newListItem = document.createElement("tr");

    let askDate = document.createElement("td");
    askDate.textContent = "06/12/2022" + " " + "16:23" + " UTC";

    let person = document.createElement("td");
    person.textContent = "Diego Luciani";

    let date = document.createElement("td");
    date.textContent = "08/12/2022" + " " + "17:00" + " UTC";

    let aiplante = document.createElement("td");
    aiplante.textContent = "LV-IDE";

    let instructor = document.createElement("td");
    instructor.textContent = "Si";

    let state = document.createElement("td");
    // IF THE TURN WAS NOT ACCEPTED YET
    let acceptButton = document.createElement("button");
    acceptButton.textContent = "Aceptar";
    let denyButton = document.createElement("button");
    denyButton.textContent = "Rechazar";

    document.querySelector("#all-turns-table").appendChild(newListItem);
    newListItem.appendChild(askDate);
    newListItem.appendChild(person);
    newListItem.appendChild(date);
    newListItem.appendChild(aiplante);
    newListItem.appendChild(instructor);
    state.appendChild(acceptButton);
    state.appendChild(denyButton);
    newListItem.appendChild(state);
}

// All flights no registered


function roleTranslation(role){
	switch(role){
		case 'admin': return "Administrador";
		case 'editor': return "Editor";
		case 'pilot': return "Piloto";
		case 'student': return "Alumno";
	}
}

