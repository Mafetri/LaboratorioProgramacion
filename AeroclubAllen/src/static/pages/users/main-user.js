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

//  =================  Role Options  =================
//  ====> Role Option Button
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

//  ====> Dashboard Button
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

//  ====> Instructor Disponibility
// Fills the table depending the role, if it is a instructor it will fill it with his aviabilities
// and a button to submit more, if it is an admin, it will show all isntructors aviabilities
if(user.role == "admin" || user.role == "secretary") {
	const instructorsAviability = await (await fetch("/api/instructors")).json();
	instructorAviabilityTable(instructorsAviability);
} else if (user.role == "instructor") {
	document.querySelector("#instructor-availability-title").textContent = "Mi Disponibilidad";
	let addAviabilityA = document.createElement("a");
	addAviabilityA.href = "#instructor-availability-form-popup";
	let addAviability = document.createElement("button");
	addAviability.classList.add("gray-button");
	addAviability.textContent = "Agregar Disponibilidad";
	addAviabilityA.appendChild(addAviability)
	document.querySelector("#instructor-availability").insertBefore(addAviabilityA, document.querySelector("#instructor-availability-title").nextSibling.nextSibling);

	let instructorAviability = await (await fetch("/api/instructors/" + user.dni)).json();
	instructorAviabilityTable(instructorAviability);
} else {
	document.querySelector("#instructor-availability").remove();
}
function instructorAviabilityTable (instructorsAviability) {
	const table = document.querySelector("#instructor-availability-table");
	for (let i = 0; i < instructorsAviability.length; i++) {
		let newListItem = document.createElement("tr");

		let completeName = document.createElement("td");
		completeName.textContent = instructorsAviability[i].name + " " + instructorsAviability[i].surname;

		let start_date = document.createElement("td");
		let dateArray = instructorsAviability[i].start_date.split("T")[0].split("-");
		let timeArray = instructorsAviability[i].start_date.split("T")[1].split(":");
		start_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1] + " UTC";

		let end_date = document.createElement("td");
		dateArray = instructorsAviability[i].end_date.split("T")[0].split("-");
		timeArray = instructorsAviability[i].end_date.split("T")[1].split(":");
		end_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1] + " UTC";


		table.appendChild(newListItem);
		newListItem.appendChild(completeName);
		newListItem.appendChild(start_date);
		newListItem.appendChild(end_date);
	}
}

//  ====> Instructor Disponibility Submit
document.querySelector("#instructor-availability-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let newData = {
		startDate: document.querySelector("#instructor-availability-form-start-date").value,
		endDate: document.querySelector("#instructor-availability-form-end-date").value,
	};

	// Uses XHR to post the form data
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/instructors");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {
		// If the server sends a success
		if (xhr.responseText == "success") {
			alert("Disponibilidad cargada con exito!");
			window.location.reload();
		} else {
			alert("Hubo un error en la carga, revise los datos o comuniquese con un administrador");
			window.location.reload();
		}
	};
	xhr.send(JSON.stringify(newData));
});

//  ====> Unchecked Turns
if (user.role == "secretary" || user.role == "admin"){
	let uncheckedTurns = await (await fetch("/api/turns?approved=unchecked")).json();
	fillTurnsTable(uncheckedTurns, document.querySelector('#unchecked-turns'));
} else {
	document.querySelector("#unchecked-turns").remove();
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
	th3.textContent = "Fecha Inicio";
	let th4 = document.createElement("th");
	th3.textContent = "Fecha Fin";
	let th5 = document.createElement("th");
	th4.textContent = "Avion";
	let th6 = document.createElement("th");
	th3.textContent = "Finalidad";
	let th7 = document.createElement("th");
	th5.textContent = "Instructor";
	let th8 = document.createElement("th");
	th6.textContent = "Opciones";
	tHead.appendChild(th1);
	tHead.appendChild(th2);
	tHead.appendChild(th3);
	tHead.appendChild(th4);
	tHead.appendChild(th5);
	tHead.appendChild(th6);
	tHead.appendChild(th7);
	tHead.appendChild(th8);

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
	
		let start_date = document.createElement("td");
		let dateArray = uncheckedTurns[i].start_date.split("T")[0].split("-");
		let timeArray = uncheckedTurns[i].start_date.split("T")[1].split(":");
		start_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1] + " UTC";

		let end_date = document.createElement("td");
		dateArray = uncheckedTurns[i].end_date.split("T")[0].split("-");
		timeArray = uncheckedTurns[i].end_date.split("T")[1].split(":");
		end_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1] + " UTC";
	
		let purpose = document.createElement("td");
		purpose.textContent = uncheckedTurns[i].purpose;

		let aiplante = document.createElement("td");
		aiplante.textContent = uncheckedTurns[i].airplane_plate;
	
		let instructor = document.createElement("td");
		if(uncheckedTurns[i].instructor_name != null){
			instructor.textContent = uncheckedTurns[i].instructor_name  + " " + uncheckedTurns[i].instructor_surname;
		} else {
			instructor.textContent = "Sin Instructor";
		}
	
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
		newListItem.appendChild(start_date);
		newListItem.appendChild(end_date);
		newListItem.appendChild(purpose);
		newListItem.appendChild(aiplante);
		newListItem.appendChild(instructor);
		state.appendChild(acceptButton);
		state.appendChild(denyButton);
		newListItem.appendChild(state);
	}
}

//  =====> Users Table
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
} else {
	document.querySelector("#users-section").remove();
	document.querySelector("#create-user-form-popup").remove();
	document.querySelector("#modify-user-form-popup").remove();
}

//  =====> Audit Log
if( user.role == "admin" || user.role == "secretary" ){
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
	document.querySelector("#audit-log").remove();
}

//  =====> Enable/Disbale User
if (user.role == "admin" || user.role == "secretary"){
	// Disable User PATCH
	document.querySelector("#disable-user-form").addEventListener("submit", (e) => {
		e.preventDefault();

		const newData = {
			enabled: "false",
		}

		// Uses XHR to post the form data
		let xhr = new XMLHttpRequest();
		xhr.open("PATCH", "/api/user/" + document.querySelector("#toggle-user-enabled-dni").value);
		xhr.setRequestHeader("content-type", "application/json");
		xhr.onload = function () {
			// If the server sends a success
			if (xhr.responseText == "success") {
				alert("Usuario desabilitado!");
				window.location.reload();
			} else {
				alert("Hubo un error, revise los datos o comuniquese con un administrador");
				window.location.reload();
			}
		};
		xhr.send(JSON.stringify(newData));
	})

	// Fill Disabled Users table
	const disabledUsers = await (await fetch("/api/disabledUsers")).json();
	disabledUsersTableFiller();
	function disabledUsersTableFiller() {
		for (let i = 0; i < disabledUsers.length; i++) {
			let newListItem = document.createElement("tr");
	
			let name = document.createElement("td");
			name.textContent = disabledUsers[i].name + " " + disabledUsers[i].surname;
	
			let dni = document.createElement("td");
			dni.textContent = disabledUsers[i].dni;

			// Enable button
			let enableUser = document.createElement("button");
			enableUser.textContent = "Habilitar";
			enableUser.classList.add("ok-button");
			enableUser.addEventListener("click", async () => {
				if (window.confirm("Seguro que quiere habilitar a " + disabledUsers[i].name + " " + disabledUsers[i].surname + "?")) {
					const res = await fetch("/api/user/" + disabledUsers[i].dni, {
						method: "PATCH",
						body: JSON.stringify({ enabled: 'true' }),
						headers: { 'Content-Type': 'application/json'}
					});
					window.location.reload();
				}
			});
	
			document.querySelector("#disabled-users-table").appendChild(newListItem);
			newListItem.appendChild(dni);
			newListItem.appendChild(name);
			newListItem.appendChild(enableUser);
		}
	}
	
}

//  =================  My Turns  =================
// Turns Form conditions
const instructor = document.querySelector("#request-turn-form-instructor");
if(user.role == "student"){
	instructor.checked = true;
	instructor.disabled = true;
	document.querySelectorAll("#request-turn-form-purpose option").forEach(option => {
		switch (option.value){
			case "readaptation": option.disabled = true; break;
			case "adaptation": option.disabled = true; break;
			case "local": option.disabled = true; break;
		}
	});;

	document.querySelector("#request-turn-form-airplane").disabled = true;
} else {
	document.querySelectorAll("#request-turn-form-purpose option").forEach(option => {
		if(option.value == "instruction"){
			option.disabled = true;
		}
	});
	const purposeSelect = document.querySelector("#request-turn-form-purpose");
	purposeSelect.addEventListener('change', () => {
		const instructor = document.querySelector("#request-turn-form-instructor");
		if(purposeSelect.value == "instruction" || purposeSelect.value == "readaptation" || purposeSelect.value == "adaptation" ){
			instructor.checked = true;
			instructor.disabled = true;
		} else {
			instructor.checked = false;
			instructor.disabled = false;
		}
	});
}

// Airplanes Options
const fleet = await (await fetch("/api/fleet?x0=0&n=200")).json();
for(let i = 0; i < fleet.length; i++){
	let option = document.createElement("option");
	option.value = fleet[i].plate;
	option.textContent = fleet[i].name + " ("+  fleet[i].plate + ")";
	document.querySelector("#request-turn-form-airplane").appendChild(option);
}

// Register a turn POST
document.querySelector("#request-turn-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let newData = {
		startDate: document.querySelector("#request-turn-form-start-date").value,
		endDate: document.querySelector("#request-turn-form-end-date").value,
		instructor: document.querySelector("#request-turn-form-instructor").checked,
		purpose: document.querySelector("#request-turn-form-purpose").value,
	};

	if ( user.role != "student" ){
		newData.airplane = document.querySelector("#request-turn-form-airplane").value
	}

	// Uses XHR to post the form data
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/turns");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {
		// If the server sends a success
		if (xhr.responseText == "success") {
			alert("Turno reservado con exito!");
		} else if (xhr.responseText == "user-disabled") {
			alert("No está habilitado para solicitar turnos, comunicarse con la secretaria");
		} else if (xhr.responseText == "no-instructor") {
			alert("No hay instructores disponibles para el turno solicitado.");
		} else if (xhr.responseText == "airplane-overlaps"){
			alert("El turno solicitado se superpone con el turno de otro para dicho avión.");
		} else {
			alert("Hubo un error en la reserva del turno, revise los datos o comuniquese con un administrador");
		}
		window.location.reload();
	};
	xhr.send(JSON.stringify(newData));
});

// My Turns
const myTurns = await(await fetch("/api/turns/"+user.dni)).json();
const table = document.querySelector("#my-turns-table");
for (let i = 0; i < myTurns.length; i++) {
	let newListItem = document.createElement("tr");

	let completeName = document.createElement("td");
	if(myTurns[i].name == null){
		completeName.textContent = "Sin Instructor";
	} else {
		completeName.textContent = myTurns[i].name + " " + myTurns[i].surname;
	}

	let start_date = document.createElement("td");
	let dateArray = myTurns[i].start_date.split("T")[0].split("-");
	let timeArray = myTurns[i].start_date.split("T")[1].split(":");
	start_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];

	let end_date = document.createElement("td");
	dateArray = myTurns[i].end_date.split("T")[0].split("-");
	timeArray = myTurns[i].end_date.split("T")[1].split(":");
	end_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];

	let status = document.createElement("td");
	switch(myTurns[i].approved){
		case 1: status.textContent = "Aprobado"; break;
		case 0: status.textContent = "Rechazado"; break;
		default: status.textContent = "En Espera"; break;
	}

	let airplanePlate = document.createElement("td");
	airplanePlate.textContent = myTurns[i].airplane_plate;

	table.appendChild(newListItem);
	newListItem.appendChild(start_date);
	newListItem.appendChild(end_date);
	newListItem.appendChild(airplanePlate);
	newListItem.appendChild(completeName);
	newListItem.appendChild(status);
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
		case "instructor":
			return "Instructor";
		case "secretary":
			return "Secretaria";
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
