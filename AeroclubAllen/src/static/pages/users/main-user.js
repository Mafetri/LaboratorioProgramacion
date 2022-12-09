const user = await (await fetch("/api/userLoggedin")).json();

fillUserInfo();
function fillUserInfo(){
    const userCard = document.querySelector("#user-card-info");
    let dni = document.createElement("h2");
    dni.textContent = "DNI: " + user.dni;
    
    let name = document.createElement("h2");
    name.textContent = "Nombre: " + user.name + " " + user.surname;
    document.querySelector("#modify-user-form-name").value = user.name;
    document.querySelector("#modify-user-form-surname").value = user.surname;

    let email = document.createElement("h2");
    email.textContent = "Email: " + user.email;
    document.querySelector("#modify-user-form-email").value = user.email;
    
    let role = document.createElement("h2");
    role.textContent = "Rol: " + roleTranslation(user.role);
    
    let phone = document.createElement("h2");
    phone.textContent = "Telefono: " + user.phone;
    document.querySelector("#modify-user-form-phone").value = user.phone;

    let moddifyButtonA = document.createElement("a");
    moddifyButtonA.href = "#modify-user-form-popup";
    let modifyButton = document.createElement("button");
    modifyButton.classList.add("modify-button");
    modifyButton.textContent = "Modificar";
    moddifyButtonA.appendChild(modifyButton);

    userCard.append(dni);
    userCard.append(name);
    userCard.append(email);
    userCard.append(role);
    userCard.append(phone);
    userCard.append(moddifyButtonA);
}

// Update User info
document.querySelector("#modify-user-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let newData = {
        name: document.querySelector("#modify-user-form-name").value,
        surname: document.querySelector("#modify-user-form-surname").value,
        email: document.querySelector("#modify-user-form-email").value,
        phone: document.querySelector("#modify-user-form-phone").value
    };

    // Uses XHR to post the form data
    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", "/api/user/" + user.dni);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
        // If the server sends a success
        if (xhr.responseText == "success") {
            alert("Cambio Realizado");
            window.location.reload();
        } else {
            alert("Error");
            window.location.reload();
        }
    };

    xhr.send(JSON.stringify(newData));
});

// Role Options Button
if(user.role != "pilot" || user.role != "student"){
    const userButtons = document.querySelector("#user-card-buttons");

    let roleButton = document.createElement("button");
    roleButton.classList.add("boton-sec-oscuro");
    roleButton.textContent = "Opciones de Rol";
    roleButton.addEventListener("click", () => {
        document.querySelector("#role-options").classList.toggle("show");
    });

    userButtons.prepend(roleButton);
}

// Dashboard Button
if(user.role == "admin" || user.role == "editor"){
    const userButtons = document.querySelector("#user-card-buttons");

    let dashboardButtonA = document.createElement("a");
    dashboardButtonA.href = "/dashboard";
    let dashboardButton = document.createElement("button");
    dashboardButton.classList.add("boton-sec-oscuro");
    dashboardButton.textContent = "Dashboard";

    dashboardButtonA.append(dashboardButton)
    userButtons.prepend(dashboardButtonA);
}

// All turns
if(user.role == "admin" || user.role == "instructor"){
    let sectionTitle = document.createElement("h2");
    sectionTitle.textContent = "Turnos"
    sectionTitle.classList.add("section-title");
    sectionTitle.classList.add("margin-auto");

    // Table
    let table = document.createElement("table");
    table.classList.add("table-user-section");

    // Head
    let tHead = document.createElement("thead");
    let th1 = document.createElement("th");
    th1.textContent = "Pedido";
    let th2 = document.createElement("th");
    th2.textContent = "Persona";
    let th3 = document.createElement("th");
    th3.textContent = "Fecha";
    let th4 = document.createElement("th");
    th4.textContent = "Avion";
    let th5 = document.createElement("th");
    th5.textContent = "¿Instructor?";
    let th6 = document.createElement("th");
    th6.textContent = "Estado";
    tHead.appendChild(th1);
    tHead.appendChild(th2);
    tHead.appendChild(th3);
    tHead.appendChild(th4);
    tHead.appendChild(th5);
    tHead.appendChild(th6);

    let tBody = document.createElement("tbody");
    tBody.id = ("all-turns-table");

    document.querySelector("#all-turns").appendChild(sectionTitle);
    document.querySelector("#all-turns").appendChild(table);
    table.appendChild(tHead);
    table.appendChild(tBody);

    // ALL THIS MUST BE ON A LOOP FOR ALL TURNS
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

        tBody.appendChild(newListItem);
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

