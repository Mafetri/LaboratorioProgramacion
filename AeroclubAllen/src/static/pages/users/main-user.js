const user = await (await fetch("/api/userLoggedin")).json();

fillUserInfo();
function fillUserInfo() {
	const userCard = document.querySelector("#user-card-info");
	let dni = document.createElement("h2");
	dni.textContent = "DNI: " + user.dni;

	let name = document.createElement("h2");
	name.textContent = "Nombre: " + user.name + " " + user.surname;
	document.querySelector("#modify-self-user-form-name").value = user.name;
	document.querySelector("#modify-self-user-form-surname").value = user.surname;

	let email = document.createElement("h2");
	email.textContent = "Email: " + user.email;
	document.querySelector("#modify-self-user-form-email").value = user.email;

	let role = document.createElement("h2");
	role.textContent = "Rol: " + roleTranslation(user.role);

	let phone = document.createElement("h2");
	phone.textContent = "Telefono: " + user.phone;
	document.querySelector("#modify-self-user-form-phone").value = user.phone;

	let moddifyButtonA = document.createElement("a");
	moddifyButtonA.href = "#modify-self-user-form-popup";
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
document.querySelector("#modify-self-user-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let newData = {
		name: document.querySelector("#modify-self-user-form-name").value,
		surname: document.querySelector("#modify-self-user-form-surname").value,
		email: document.querySelector("#modify-self-user-form-email").value,
		phone: document.querySelector("#modify-self-user-form-phone").value,
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

//  =================  Role Option Button  =================
if (user.role != "pilot" && user.role != "student" && user.role != "editor") {
	const userButtons = document.querySelector("#user-card-buttons");

	let roleButton = document.createElement("button");
	roleButton.classList.add("gray-button");
	roleButton.textContent = "Opciones de Rol";
	let statusHidden = true;
	document.querySelector("#role-options").style.transition = "transform ease-in-out 0.3s";
	roleButton.addEventListener("click", () => {
		document.querySelector("#role-options").classList.toggle("show");
		document.querySelector("#role-options").style.transform = "translateY(-25px)";
		setTimeout(function () {
			document.querySelector("#role-options").style.transform = "translateY(0px)";
		}, 0);
		statusHidden = false;
	});

	userButtons.prepend(roleButton);
}

//  =================  Dashboard Button  =================
if (user.role == "admin" || user.role == "editor") {
	const userButtons = document.querySelector("#user-card-buttons");

	let dashboardButtonA = document.createElement("a");
	dashboardButtonA.href = "/dashboard";
	let dashboardButton = document.createElement("button");
	dashboardButton.classList.add("gray-button");
	dashboardButton.textContent = "Dashboard";

	dashboardButtonA.append(dashboardButton);
	userButtons.prepend(dashboardButtonA);
}

//  =================  All turns  =================
if (user.role == "admin" || user.role == "instructor") {
	let sectionTitle = document.createElement("h2");
	sectionTitle.textContent = "Turnos";
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
	tBody.id = "all-turns-table";

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

//  =================  Users  =================
if (user.role == "admin") {
	let users = await (await fetch("/api/users?importants=true")).json();
	fillUserTable(users);

	// Fills the users table
	document.querySelector("#load-all-users").addEventListener("click", async (e) => {
		let restOfUsers = await (await fetch("/api/users?importants=false")).json();
		document.querySelector("#load-all-users").remove();
		fillUserTable(restOfUsers);
	})
	function fillUserTable(users) {
		for (let i = 0; i < users.length; i++) {
			let newListItem = document.createElement("tr");
	
			let dni = document.createElement("td");
			dni.textContent = users[i].dni;
			let name = document.createElement("td");
			name.textContent = users[i].surname + ", " + users[i].name;
			let role = document.createElement("td");
			role.textContent = roleTranslation(users[i].role);
	
			let buttons = document.createElement("td");
			buttons.classList.add("user-buttons");
	
			// Delete button
			let deleteUser = document.createElement("button");
			deleteUser.textContent = "Borrar";
			deleteUser.classList.add("delete-button");
			deleteUser.addEventListener("click", async () => {
				if (window.confirm("Seguro que quiere borrar a " + users[i].name + " " + users[i].surname + "?")) {
					const res = await fetch("/api/user/" + users[i].dni, {
						method: "DELETE",
					});
					window.location.reload();
				}
			});
	
			// Modify Button
			let modifyUser = document.createElement("a");
			modifyUser.href = "#modify-user-form-popup";
			modifyUser.textContent = "Modificar";
			modifyUser.classList.add("modify-button");
			modifyUser.addEventListener("click", async () => {
				// It fills the form with the editable current value of the user
				document.querySelector("#modify-user-form-dni").innerHTML = "Modificando Usuario: " + users[i].dni;
				document.querySelector("#modify-user-form-name").value = users[i].name;
				document.querySelector("#modify-user-form-surname").value = users[i].surname;
				document.querySelector("#modify-user-form-phone").value = users[i].phone;
				document.querySelector("#modify-user-form-email").value = users[i].email;
				document.querySelector("#modify-user-form-role").seleccted = users[i].role;
			});
	
			document.querySelector("#users-table").appendChild(newListItem);
			newListItem.appendChild(dni);
			newListItem.appendChild(name);
			newListItem.appendChild(role);
			newListItem.appendChild(buttons);
			buttons.appendChild(deleteUser);
			buttons.appendChild(modifyUser);
		}
	}

	// Crete User POST
	document.querySelector("#create-user-form").addEventListener("submit", (e) => {
		e.preventDefault();

		let newData = {
			dni: document.querySelector("#create-user-form-dni").value,
			role: document.querySelector("#create-user-form-role").value,
		};

		// Uses XHR to post the form data
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "/api/user");
		xhr.setRequestHeader("content-type", "application/json");
		xhr.onload = function () {
			// If the server sends a success
			if (xhr.responseText == "success") {
				alert("Usuario creado con exito!");
				window.location.replace("#users");
				window.location.reload();
			} else {
				alert("Hubo un error en la creacion del usuario!");
				window.location.replace("#users");
				window.location.reload();
			}
		};

		xhr.send(JSON.stringify(newData));
	});

	// Modify User PATCH
	document.querySelector("#modify-user-form").addEventListener("submit", (e) => {
		e.preventDefault();

		let newData = {
			name: document.querySelector("#modify-user-form-name").value,
			surname: document.querySelector("#modify-user-form-surname").value,
			email: document.querySelector("#modify-user-form-email").value,
			phone: document.querySelector("#modify-user-form-phone").value,
			role: document.querySelector("#modify-user-form-role").value,
		};

		// Uses XHR to post the form data
		let xhr = new XMLHttpRequest();
		xhr.open("PATCH", "/api/user/" + document.querySelector("#modify-user-form-dni").innerHTML.split(" ")[2]);
		xhr.setRequestHeader("content-type", "application/json");
		xhr.onload = function () {
			// If the server sends a success
			if (xhr.responseText == "success") {
				alert("Cambio Realizado");
				window.location.replace("#users");
				window.location.reload();
			} else {
				alert("Error");
				window.location.replace("#users");
				window.location.reload();
			}
		};

		xhr.send(JSON.stringify(newData));
	});

	// Auditlog table fill
	const auditlog = await (await fetch("/api/auditlog?x0=0&n=20")).json();
	for (let i = 0; i < auditlog.length; i++) {
		let newListItem = document.createElement("tr");

		let date = document.createElement("td");
		let dateArray = auditlog[i].date.split("T")[0].split("-");
		let timeArray = auditlog[i].date.split("T")[1].split(":");
		date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1] + " UTC";

		let description = document.createElement("td");
		description.textContent =
			auditlog[i].name +
			" " +
			auditlog[i].surname +
			" " +
			descriptionTranslation(auditlog[i].description, auditlog[i].table_name, auditlog[i].primary_key_changed);

		document.querySelector("#auditlog-table").appendChild(newListItem);
		newListItem.appendChild(date);
		newListItem.appendChild(description);
	}
} else {
	console.log("hola");
	document.querySelector("#users-section").remove();
	document.querySelector("#audit-log").remove();
	document.querySelector("#create-user-form-popup").remove();
	document.querySelector("#modify-user-form-popup").remove();
}

if (user.role == "secretary" || user.role == "admin"){
	let uncheckedTurns = await (await fetch("/api/turns?approved=unchecked")).json();
	fillTurnsTable(uncheckedTurns, document.querySelector('#unchecked-turns'));
}
function fillTurnsTable(uncheckedTurns, tableName){
	let sectionTitle = document.createElement("h2");
	sectionTitle.textContent = "Turnos";
	sectionTitle.classList.add("section-title");
	sectionTitle.classList.add("margin-auto");

	// Table
	let table = document.createElement("table");
	table.classList.add("table-user-section");

	// Head
	let tHead = document.createElement("thead");
	let th1 = document.createElement("th");
	th1.textContent = "Fecha Pedido";
	let th2 = document.createElement("th");
	th2.textContent = "Persona";
	let th3 = document.createElement("th");
	th3.textContent = "Fecha";
	let th4 = document.createElement("th");
	th4.textContent = "Avion";
	let th5 = document.createElement("th");
	th5.textContent = "Instructor";
	let th6 = document.createElement("th");
	th6.textContent = "Opciones";
	tHead.appendChild(th1);
	tHead.appendChild(th2);
	tHead.appendChild(th3);
	tHead.appendChild(th4);
	tHead.appendChild(th5);
	tHead.appendChild(th6);

	let tBody = document.createElement("tbody");
	tBody.id = "unchecked-turns-table";

	tableName.appendChild(sectionTitle);
	tableName.appendChild(table);
	table.appendChild(tHead);
	table.appendChild(tBody);

	for(let i = 0; i < uncheckedTurns.length; i++){
		let newListItem = document.createElement("tr");
	
		let reqDate = document.createElement("td");
		let reqDateArray = uncheckedTurns[i].request_date.split("T")[0].split("-");
		let reqTimeArray = uncheckedTurns[i].request_date.split("T")[1].split(":");
		reqDate.textContent = reqDateArray[2] + "/" + reqDateArray[1] + "/" + reqDateArray[0] + " " + reqTimeArray[0] + ":" + reqTimeArray[1] + " UTC";
	
		let person = document.createElement("td");
		person.textContent = uncheckedTurns[i].requester_name + " " + uncheckedTurns[i].requester_surname;
	
		let date = document.createElement("td");
		let dateArray = uncheckedTurns[i].date.split("T")[0].split("-");
		let timeArray = uncheckedTurns[i].date.split("T")[1].split(":");
		date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1] + " UTC";
	
		let aiplante = document.createElement("td");
		aiplante.textContent = uncheckedTurns[i].airplane_plate;
	
		let instructor = document.createElement("td");
		instructor.textContent = uncheckedTurns[i].instructor_name + " " + uncheckedTurns[i].instructor_surname;
	
		let state = document.createElement("td");
		let acceptButton = document.createElement("button");
		acceptButton.textContent = "Aceptar";
		acceptButton.addEventListener("click", async () => {
			if (window.confirm("Seguro que desea aceptar el turno? ")) {
				const res = await fetch("/api/turns/" + uncheckedTurns[i].id + "?result=true", {
					method: "PATCH",
				});
				window.location.reload();
			}
		});

		let denyButton = document.createElement("button");
		denyButton.textContent = "Rechazar";
		denyButton.addEventListener("click", async () => {
			if (window.confirm("Seguro que desea denegar el turno? ")) {
				const res = await fetch("/api/turns/" + uncheckedTurns[i].id, {
					method: "PATCH",
					search: new URLSearchParams().append('result','false'),
				});
				window.location.reload();
			}
		});
	
		tBody.appendChild(newListItem);
		newListItem.appendChild(reqDate);
		newListItem.appendChild(person);
		newListItem.appendChild(date);
		newListItem.appendChild(aiplante);
		newListItem.appendChild(instructor);
		state.appendChild(acceptButton);
		state.appendChild(denyButton);
		newListItem.appendChild(state);
	}
}

function roleTranslation(role) {
	switch (role) {
		case "admin":
			return "Administrador";
		case "editor":
			return "Editor";
		case "pilot":
			return "Piloto";
		case "student":
			return "Alumno";
	}
}

function descriptionTranslation(description, tableName, key) {
	let descriptionTranslated;
	switch (description) {
		case "modification":
			descriptionTranslated = "modificó";
			break;
		case "creation":
			descriptionTranslated = "creó";
			break;
		case "deletion":
			descriptionTranslated = "eliminó";
			break;
	}
	switch (tableName) {
		case "fleet":
			descriptionTranslated += " el avión";
			break;
		case "news":
			descriptionTranslated += " la noticia";
			break;
		case "users":
			descriptionTranslated += " el usuario";
			break;
	}
	descriptionTranslated += ": " + key;
	return descriptionTranslated;
}
