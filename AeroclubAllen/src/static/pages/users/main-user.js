// All the users needed info
const user = await (await fetch("/api/userLoggedin")).json();
const instructorsAviability = await (await fetch("/api/instructors")).json();
const myTurns = await(await fetch("/api/turns/"+user.dni)).json();
const allTurns = await(await fetch("/api/turns")).json();
const fleet = await (await fetch("/api/fleet?x0=0&n=200")).json();
const instructors = await(await fetch("/api/usersInstructors")).json();
const rates = await(await fetch("/api/rates?startDate=" + (new Date).toISOString())).json();

// To local time
const localTime = -3;
turnsToLocalTime(myTurns);
turnsToLocalTime(allTurns);
turnsToLocalTime(instructorsAviability);

// User Card Info
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

	const myAvailability = instructorsAviability.filter((i)=> i.instructor_dni == user.dni);
	instructorAviabilityTable(myAvailability);
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
		start_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];

		let end_date = document.createElement("td");
		dateArray = instructorsAviability[i].end_date.split("T")[0].split("-");
		timeArray = instructorsAviability[i].end_date.split("T")[1].split(":");
		end_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];


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

//  ====> Instructor Turns Assigned Submit
if (user.role == "instructor") {
	for(let i = 0; i < allTurns.length; i++){
		if(allTurns[i].instructor_dni == user.dni){
			let newListItem = document.createElement("article");
			newListItem.classList.add("turns-grid-card");

			let divInfo = document.createElement("div");
			divInfo.classList.add("turns-grid-card");

			let nameTitle = document.createElement("h2");
			nameTitle.textContent = "Socio:"
			let completeName = document.createElement("p");
			completeName.textContent = allTurns[i].requester_name + " " + allTurns[i].requester_surname;

			let startDateTitle = document.createElement("h2");
			startDateTitle.textContent = "Salida:";
			let start_date = document.createElement("p");
			let dateArray = allTurns[i].start_date.split("T")[0].split("-");
			let timeArray = allTurns[i].start_date.split("T")[1].split(":");
			start_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];

			let endDateTitle = document.createElement("h2");
			endDateTitle.textContent = "Llegada:";
			let end_date = document.createElement("p");
			dateArray = allTurns[i].end_date.split("T")[0].split("-");
			timeArray = allTurns[i].end_date.split("T")[1].split(":");
			end_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];

			let statusTitle = document.createElement("h2");
			statusTitle.textContent = "Estado:";
			let status = document.createElement("p");
			switch(allTurns[i].approved){
				case 1: status.textContent = "Aprobado"; break;
				case 0: status.textContent = "Rechazado"; break;
				default: status.textContent = "En Espera"; break;
			}

			let airplanePlateTitle = document.createElement("h2");
			airplanePlateTitle.textContent = "Avion:";
			let airplanePlate = document.createElement("p");
			airplanePlate.textContent = allTurns[i].airplane_plate;

			// Cancel Button
			let cancelButton = document.createElement("button");
			cancelButton.textContent = "Reasignar";
			cancelButton.classList.add("delete-button");
			cancelButton.addEventListener("click", async () => {
				if (window.confirm("Seguro que quiere asignar a otro instructor el turno?")) {
					alert("Proximamente");
					window.location.reload();
				}
			});

			document.querySelector("#instructor-assigned-turns-table").appendChild(newListItem);
			newListItem.appendChild(divInfo);
			divInfo.appendChild(startDateTitle);
			divInfo.appendChild(start_date);
			divInfo.appendChild(endDateTitle);
			divInfo.appendChild(end_date);
			divInfo.appendChild(airplanePlateTitle);
			divInfo.appendChild(airplanePlate);
			divInfo.appendChild(nameTitle);
			divInfo.appendChild(completeName);
			divInfo.appendChild(statusTitle);
			divInfo.appendChild(status);
			newListItem.appendChild(cancelButton);
		}
	}
} else {
	document.querySelector("#instructor-assigned-turns").remove();
}

//  ====> Unchecked Turns
if (user.role == "secretary" || user.role == "admin"){
	let uncheckedTurns = await (await fetch("/api/turns?approved=unchecked")).json();
	turnsToLocalTime(uncheckedTurns);

	if(uncheckedTurns.length > 0){
		fillTurnsTable(uncheckedTurns);
	} else {
		let noTurns = document.createElement("h3");
		noTurns.textContent = "No hay turnos a revisar";
		document.querySelector('#unchecked-turns-grid').appendChild(noTurns);
	}
} else {
	document.querySelector("#unchecked-turns").remove();
}
function fillTurnsTable(uncheckedTurns){
	for(let i = 0; i < uncheckedTurns.length; i++){
		let newListItem = document.createElement("article");
		newListItem.classList.add("turns-grid-card");
	
		let divInfo = document.createElement("div");
		divInfo.classList.add("turns-grid-card");

		let reqDateTitle = document.createElement("h2");
		reqDateTitle.textContent = "Fecha de Solicitud";
		let reqDate = document.createElement("p");
		let reqDateArray = uncheckedTurns[i].request_date.split("T")[0].split("-");
		let reqTimeArray = uncheckedTurns[i].request_date.split("T")[1].split(":");
		reqDate.textContent = reqDateArray[2] + "/" + reqDateArray[1] + "/" + reqDateArray[0] + " " + reqTimeArray[0] + ":" + reqTimeArray[1] + " UTC";
	
		let personTitle = document.createElement("h2");
		personTitle.textContent = "Socio:";
		let person = document.createElement("td");
		person.textContent = uncheckedTurns[i].requester_name + " " + uncheckedTurns[i].requester_surname;

		let instructorTitle = document.createElement("h2");
		instructorTitle.textContent = "Instructor:";
		let instructorName = document.createElement("p");
		if(uncheckedTurns[i].instructor_name == null){
			instructorName.textContent = "Sin Instructor";
		} else {
			instructorName.textContent = uncheckedTurns[i].instructor_name + " " + uncheckedTurns[i].instructor_surname;
		}

		let startDateTitle = document.createElement("h2");
		startDateTitle.textContent = "Salida:";
		let start_date = document.createElement("p");
		let dateArray = uncheckedTurns[i].start_date.split("T")[0].split("-");
		let timeArray = uncheckedTurns[i].start_date.split("T")[1].split(":");
		start_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];

		let endDateTitle = document.createElement("h2");
		endDateTitle.textContent = "Llegada:";
		let end_date = document.createElement("p");
		dateArray = uncheckedTurns[i].end_date.split("T")[0].split("-");
		timeArray = uncheckedTurns[i].end_date.split("T")[1].split(":");
		end_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];

		let statusTitle = document.createElement("h2");
		statusTitle.textContent = "Estado:";

		let airplanePlateTitle = document.createElement("h2");
		airplanePlateTitle.textContent = "Avion:";
		let airplanePlate = document.createElement("p");
		airplanePlate.textContent = uncheckedTurns[i].airplane_plate;

		let purposeTitle = document.createElement("h2");
		purposeTitle.textContent = "Proposito:";
		let purpose = document.createElement("p");
		switch(uncheckedTurns[i].purpose){
			case "local": purpose.textContent = "Local"; break;
			case "readaptation": purpose.textContent = "Readaptación"; break;
			case "adaptation": purpose.textContent = "Adaptación"; break;
			case "navigation": purpose.textContent = "Navegación"; break;
			case "navigation": purpose.textContent = "Navegación"; break;
			case "instruction": purpose.textContent = "Instrucción"; break;
		}
	
		let state = document.createElement("div");
		let acceptButton = document.createElement("button");
		acceptButton.textContent = "Aceptar";
		acceptButton.classList.add("ok-button");
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
		denyButton.classList.add("delete-button");
		denyButton.addEventListener("click", async () => {
			if (window.confirm("Seguro que desea denegar el turno? ")) {
				const res = await fetch("/api/turns/" + uncheckedTurns[i].id, {
					method: "PATCH",
					search: new URLSearchParams().append('result','false'),
				});
				window.location.reload();
			}
		});
	
		document.querySelector("#unchecked-turns-grid").appendChild(newListItem);
		newListItem.appendChild(divInfo);
		divInfo.appendChild(reqDateTitle);
		divInfo.appendChild(reqDate);
		divInfo.appendChild(personTitle);
		divInfo.appendChild(person);
		divInfo.appendChild(startDateTitle);
		divInfo.appendChild(start_date);
		divInfo.appendChild(endDateTitle);
		divInfo.appendChild(end_date);
		divInfo.appendChild(purposeTitle);
		divInfo.appendChild(purpose);
		divInfo.appendChild(airplanePlateTitle);
		divInfo.appendChild(airplanePlate);
		divInfo.appendChild(instructorTitle);
		divInfo.appendChild(instructorName);
		newListItem.appendChild(state);
		state.appendChild(acceptButton);
		state.appendChild(denyButton);
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
				document.querySelector("#modify-user-form-role").value = users[i].role;
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
} else {
	document.querySelector("#disable-user").remove();
}


//  =================  Rates  =================
const rateTable = document.querySelector("#rates-table");
for(let i = 0; i < rates.length; i++){
	let newListItem = document.createElement("tr");

	let airplane = document.createElement("td");
	airplane.textContent = rates[i].airplane_plate;

	let rate = document.createElement("td");
	rate.textContent = "$" + parseFloat(rates[i].rate).toLocaleString();

	let start_date = document.createElement("td");
	let dateArray = rates[i].start_date.split("T")[0].split("-");
	start_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];

	rateTable.appendChild(newListItem);
	newListItem.appendChild(airplane);
	newListItem.appendChild(start_date);
	newListItem.appendChild(rate);
}

//  =================  My Turns  =================
// Turns Form conditions
const instructor = document.querySelector("#request-turn-form-instructor");
if( user.role != "admin"){
	document.querySelectorAll("#request-turn-form-purpose option").forEach(option => {
		switch (option.value){
			case "workshop": option.disabled = true; break;
			case "baptism": option.disabled = true; break;
		}
	});;
}
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
for(let i = 0; i < fleet.length; i++){
	let option = document.createElement("option");
	option.value = fleet[i].plate;
	option.textContent = fleet[i].name + " ("+  fleet[i].plate + ")";
	document.querySelector("#request-turn-form-airplane").appendChild(option);
}

//  ======>   Request a Turn
document.getElementById('request-turn-form-start-date').addEventListener('change', function() {
	let startDate = new Date(document.getElementById('request-turn-form-start-date').value);
	startDate.setHours(startDate.getHours() + localTime);

	document.getElementById('request-turn-form-end-date').min = startDate.toISOString().substring(0,16);

	startDate.setHours(startDate.getHours() + 1);
	document.getElementById('request-turn-form-end-date').value = startDate.toISOString().substring(0,16);
});
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

//  =====>   My Turns Table
const table = document.querySelector("#my-turns-table");
if(myTurns.length > 0){
	for (let i = 0; i < myTurns.length; i++) {
		let newListItem = document.createElement("article");
		newListItem.classList.add("turns-grid-card");
	
		let divInfo = document.createElement("div");
		divInfo.classList.add("turns-grid-card");
	
		let nameTitle = document.createElement("h2");
		nameTitle.textContent = "Instructor:";
		let completeName = document.createElement("p");
		if(myTurns[i].name == null){
			completeName.textContent = "Sin Instructor";
		} else {
			completeName.textContent = myTurns[i].name + " " + myTurns[i].surname;
		}
	
		let startDateTitle = document.createElement("h2");
		startDateTitle.textContent = "Salida:";
	
		let start_date = document.createElement("p");
		let dateArray = myTurns[i].start_date.split("T")[0].split("-");
		let timeArray = myTurns[i].start_date.split("T")[1].split(":");
		start_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];
	
		let endDateTitle = document.createElement("h2");
		endDateTitle.textContent = "Llegada:";
	
		let end_date = document.createElement("p");
		dateArray = myTurns[i].end_date.split("T")[0].split("-");
		timeArray = myTurns[i].end_date.split("T")[1].split(":");
		end_date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];
	
		let statusTitle = document.createElement("h2");
		statusTitle.textContent = "Estado:";
		
		let status = document.createElement("p");
		switch(myTurns[i].approved){
			case 1: status.textContent = "Aprobado"; break;
			case 0: status.textContent = "Rechazado"; break;
			default: status.textContent = "En Espera"; break;
		}
	
		let airplanePlateTitle = document.createElement("h2");
		airplanePlateTitle.textContent = "Avion:";
	
		let airplanePlate = document.createElement("p");
		airplanePlate.textContent = myTurns[i].airplane_plate;
	
		// Cancel Button
		let cancelButton = document.createElement("button");
		cancelButton.textContent = "Cancelar";
		cancelButton.classList.add("delete-button");
		cancelButton.addEventListener("click", async () => {
			if (window.confirm("Seguro que quiere cancelar el turno?")) {
				const res = await fetch("/api/turns/" + myTurns[i].id, {
					method: "DELETE",
				});
				window.location.reload();
			}
		});
	
		table.appendChild(newListItem);
		newListItem.appendChild(divInfo);
		divInfo.appendChild(startDateTitle);
		divInfo.appendChild(start_date);
		divInfo.appendChild(endDateTitle);
		divInfo.appendChild(end_date);
		divInfo.appendChild(airplanePlateTitle);
		divInfo.appendChild(airplanePlate);
		divInfo.appendChild(nameTitle);
		divInfo.appendChild(completeName);
		divInfo.appendChild(statusTitle);
		divInfo.appendChild(status);
		newListItem.appendChild(cancelButton);
	}
} else {
	let noTurns = document.createElement("h3");
	noTurns.textContent = "No hay turnos agendados";
	
	table.appendChild(noTurns);
}


//  ===========   All Turns   ===========
const oneHourHeight = 55;
const start_hour = 6;
const end_hour = 21;

// Creates the hours on the left
for(let i = 0; i < end_hour-start_hour; i++){
	let hour = document.createElement("div");
	hour.style = "height: "+oneHourHeight+"px;"; 
	hour.id = "hour-box";
	hour.textContent = (i+start_hour)+" hs ";
	document.querySelector("#table-turns-hours").appendChild(hour);
}

// Creates the header row with the names of the airplanes
for(let i = 0; i < (fleet.length); i++){
	let airplane = document.createElement("div");
	airplane.id = fleet[i].plate;
	document.querySelector("#table-turns").appendChild(airplane);
	
	let airplaneName = document.createElement("p");
	airplaneName.textContent = fleet[i].plate;
	airplaneName.classList.add("table-header-title");
	airplane.appendChild(airplaneName);
}

// Defines the height of the table
const tableHeight = document.querySelector("#table-turns-hours").offsetHeight;

// Inicial day 																								
document.querySelector("#all-turns-date-input").value = new Date().toISOString().substring(0,10);
document.querySelector("#all-turns-date-input").min = new Date().toISOString().substring(0,10);
let selecctedDay = document.querySelector("#all-turns-date-input").value;

// If somebody changes the time of the input of all turns
document.querySelector("#all-turns-date-input").addEventListener("change", ()=> {
	selecctedDay = document.querySelector("#all-turns-date-input").value;
	let turnLoaded = document.querySelectorAll("#turn-box");
	turnLoaded.forEach((t)=>{
		t.remove();
	})	
	fillAllTurns();
})

// Divide long turns from allTurns into smaller ones from the start_hour to end_hour 
let turns = [];
allTurns.forEach((t)=>{
	let newTurn = JSON.parse(JSON.stringify(t));
	const startDate = new Date(t.start_date);
	let endDate = new Date(t.end_date);

	let flagStartDate = new Date(t.start_date);
	flagStartDate.setHours(start_hour + localTime);
	flagStartDate.setMinutes(0);

	let flagEndDate = new Date(t.start_date);
	flagEndDate.setHours(end_hour + localTime);
	flagEndDate.setMinutes(0);

	if(flagStartDate.toISOString() > startDate.toISOString()){
		newTurn.start_date = new Date(flagStartDate);
	} else {
		newTurn.start_date = new Date(startDate);
	}
	flagStartDate.setDate(flagStartDate.getDate() + 1);

	if(flagEndDate.toISOString() < endDate.toISOString()){
		newTurn.end_date = new Date(flagEndDate).toISOString();
	} else {
		newTurn.end_date = new Date(endDate).toISOString();
	}
	flagEndDate.setDate(flagEndDate.getDate() + 1);

	turns.push(JSON.parse(JSON.stringify(newTurn)));

	while(flagStartDate.toISOString() < endDate.toISOString()){
		// Sets the start time at the start time of the day
		newTurn.start_date = new Date(flagStartDate).toISOString();

		// If the end_date of the turn finishes after the finish hour of that day
		if(flagEndDate.toISOString() < endDate.toISOString()){
			newTurn.end_date = new Date(flagEndDate).toISOString();
		} else {
			newTurn.end_date = new Date(endDate).toISOString();
			turns.push(JSON.parse(JSON.stringify(newTurn)));
			break;
		}
		turns.push(JSON.parse(JSON.stringify(newTurn)));
		flagStartDate.setDate(flagStartDate.getDate() + 1);
		flagEndDate.setDate(flagEndDate.getDate() + 1);
	}
})

// Fills the turns table
fillAllTurns();
function fillAllTurns() {
	for(let i = 0; i < turns.length; i++){
		if(selecctedDay == turns[i].start_date.split("T")[0]){
			const turnLength = (new Date(turns[i].end_date).getTime() - new Date(turns[i].start_date).getTime())/1000/60/60;
	
			let timeArray = turns[i].start_date.split("T")[1].split(":");
			let start_date = timeArray[0] + ":" + timeArray[1];
		
			timeArray = turns[i].end_date.split("T")[1].split(":");
			let end_date = timeArray[0] + ":" + timeArray[1];

			let hourOfStart = parseFloat(turns[i].start_date.split("T")[1].split(":")[0]) + parseFloat(turns[i].start_date.split("T")[1].split(":")[1]/60);
			let allSibilings = document.querySelectorAll('#'+turns[i].airplane_plate + " div");
			let sibilingsHeight = 0;
			for(let j = 0; j < allSibilings.length; j++){
				sibilingsHeight += allSibilings[j].offsetHeight;
			}
			
			let pxOffset = ((hourOfStart - start_hour) * oneHourHeight) - sibilingsHeight;
			let pxHeight = turnLength*oneHourHeight;

			let turn = document.createElement("div");
			turn.textContent = start_date + " - " + end_date;
			turn.id = "turn-box";
			if(turns[i].purpose == "workshop"){
				turn.style = "height: " + pxHeight + "px; translate: 0px " + pxOffset + "px; background-color: orange";
				turn.textContent += "\r\nTaller";
			} else if(turns[i].purpose == "baptism"){
				turn.style = "height: " + pxHeight + "px; translate: 0px " + pxOffset + "px; background-color: darkcyan";
				turn.textContent += "\r\nBautismo";
			} else {
				turn.textContent += "\r\n" + turns[i].requester_name + " " + turns[i].requester_surname;
				turn.style = "height: " + pxHeight + "px; translate: 0px " + pxOffset + "px;";
			}

			if(turns[i].approved === null){
				turn.style = "height: " + pxHeight + "px; translate: 0px " + pxOffset + "px; background-color: crimson;";
			}

			document.querySelector('#'+turns[i].airplane_plate).appendChild(turn);
		}
	}
}

// ===========   Instructor Aviability   ===========
// Creates the hours on the left
for(let i = 0; i < end_hour-start_hour; i++){
	let hour = document.createElement("div");
	hour.style = "height: "+oneHourHeight+"px;"; 
	hour.id = "hour-box";
	hour.textContent = (i+start_hour)+" hs ";
	document.querySelector("#table-instructors-hours").appendChild(hour);
}

// Creates the header row with the names of the instructors
for(let i = 0; i < (instructors.length); i++){
	// Div for instructor
	let instructor = document.createElement("div");
	instructor.id = instructors[i].name + instructors[i].surname.charAt(0);

	let instructorName = document.createElement("p");
	instructorName.textContent = instructors[i].name + " " + instructors[i].surname.charAt(0);
	instructorName.classList.add("table-header-title");
	
	instructor.appendChild(instructorName);
	document.querySelector("#table-instructors").appendChild(instructor);
	
	// Div for times
	let instrcutorDiv = document.createElement("div");
	instrcutorDiv.id = "instrcutor-div";
	instructor.appendChild(instrcutorDiv);
	
	// Div for instructor aviability
	let instructorAviability = document.createElement("div");
	instructorAviability.id = instructors[i].name + instructors[i].surname.charAt(0) + "-A";
	instrcutorDiv.appendChild(instructorAviability);

	// Div for instructor turns
	let instructorTurns = document.createElement("div");
	instructorTurns.id = instructors[i].name + instructors[i].surname.charAt(0) + "-T";
	instrcutorDiv.appendChild(instructorTurns);
}

// Defines the height of the table
const tableInstructorHeight = document.querySelector("#table-instructors-hours").offsetHeight;

// Inicial day 																							
document.querySelector("#all-instructors-date-input").value = new Date().toISOString().substring(0,10);
document.querySelector("#all-instructors-date-input").min = new Date().toISOString().substring(0,10);
let selecctedInstructorsDay = document.querySelector("#all-instructors-date-input").value;

// If somebody changes the time of the input of all instructors
document.querySelector("#all-instructors-date-input").addEventListener("change", ()=> {
	selecctedInstructorsDay = document.querySelector("#all-instructors-date-input").value;
	let turnLoaded = document.querySelectorAll("#instructor-box");
	turnLoaded.forEach((t)=>{
		t.remove();
	})
	let isntructorTurns = document.querySelectorAll("#instructor-turn-box");
	isntructorTurns.forEach((t)=>{
		t.remove();
	})
	fillAllInstructors();
})

// If some block of instructorsAviability excedes the start_hour or end_hour it crop it and save it as diferent turns
let aviabilities = [];
instructorsAviability.forEach((t)=>{
	let newTurn = JSON.parse(JSON.stringify(t));
	const startDate = new Date(t.start_date);
	let endDate = new Date(t.end_date);

	let flagStartDate = new Date(t.start_date);
	flagStartDate.setHours(start_hour + localTime);
	flagStartDate.setMinutes(0);

	let flagEndDate = new Date(t.start_date);
	flagEndDate.setHours(end_hour + localTime);
	flagEndDate.setMinutes(0);

	if(flagStartDate.toISOString() > startDate.toISOString()){
		newTurn.start_date = new Date(flagStartDate);
	} else {
		newTurn.start_date = new Date(startDate);
	}
	flagStartDate.setDate(flagStartDate.getDate() + 1);

	if(flagEndDate.toISOString() < endDate.toISOString()){
		newTurn.end_date = new Date(flagEndDate).toISOString();
	} else {
		newTurn.end_date = new Date(endDate).toISOString();
	}
	flagEndDate.setDate(flagEndDate.getDate() + 1);

	aviabilities.push(JSON.parse(JSON.stringify(newTurn)));

	while(flagStartDate.toISOString() < endDate.toISOString()){
		// Sets the start time at the start time of the day
		newTurn.start_date = new Date(flagStartDate).toISOString();

		// If the end_date of the turn finishes after the finish hour of that day
		if(flagEndDate.toISOString() < endDate.toISOString()){
			newTurn.end_date = new Date(flagEndDate).toISOString();
		} else {
			newTurn.end_date = new Date(endDate).toISOString();
			aviabilities.push(JSON.parse(JSON.stringify(newTurn)));
			break;
		}
		aviabilities.push(JSON.parse(JSON.stringify(newTurn)));
		flagStartDate.setDate(flagStartDate.getDate() + 1);
		flagEndDate.setDate(flagEndDate.getDate() + 1);
	}
})

// Fills the instructor table
fillAllInstructors();
function fillAllInstructors() {
	for(let i = 0; i < aviabilities.length; i++){
		// Fills the table with the aviabiltiy of the instructor
		if(selecctedInstructorsDay == aviabilities[i].start_date.split("T")[0]) {
			let insctructionLength = (new Date(aviabilities[i].end_date).getTime() - new Date(aviabilities[i].start_date).getTime())/1000/60/60;
	
			let timeArray = aviabilities[i].start_date.split("T")[1].split(":");
			let start_date = timeArray[0] + ":" + timeArray[1];
		
			timeArray = aviabilities[i].end_date.split("T")[1].split(":");
			let end_date = timeArray[0] + ":" + timeArray[1];
		
			let hourOfStart = parseFloat(aviabilities[i].start_date.split("T")[1].split(":")[0]) + parseFloat(aviabilities[i].start_date.split("T")[1].split(":")[1]/60);
			let allSibilings = document.querySelectorAll('#'+aviabilities[i].name+aviabilities[i].surname.charAt(0)+ "-A div");
			let sibilingsHeight = 0;
			for(let j = 0; j < allSibilings.length; j++){
				sibilingsHeight += allSibilings[j].offsetHeight;
			}
	
			let pxOffset = ((hourOfStart - start_hour) * oneHourHeight) - sibilingsHeight;
	
			let instruction = document.createElement("div");
			instruction.textContent = start_date + " - " + end_date;
			instruction.style = "height: " + insctructionLength*oneHourHeight + "px; translate: 0px "+pxOffset+"px;";
			instruction.id = "instructor-box";
			document.querySelector('#'+aviabilities[i].name+aviabilities[i].surname.charAt(0)+"-A").appendChild(instruction);

			// Now fills  the turns of i instructor
			fillInstrcutorTurns (i)
		}
	}
}
function fillInstrcutorTurns (i) {
	for(let j = 0; j < turns.length; j++){
		if(selecctedInstructorsDay == turns[j].start_date.split("T")[0] && turns[j].instructor_dni == aviabilities[i].instructor_dni){
			const turnLength = (new Date(turns[j].end_date).getTime() - new Date(turns[j].start_date).getTime())/1000/60/60;
	
			let timeArray = turns[j].start_date.split("T")[1].split(":");
			let start_date = timeArray[0] + ":" + timeArray[1];
		
			timeArray = turns[j].end_date.split("T")[1].split(":");
			let end_date = timeArray[0] + ":" + timeArray[1];
		
			let hourOfStart = parseFloat(turns[j].start_date.split("T")[1].split(":")[0]) + parseFloat(turns[j].start_date.split("T")[1].split(":")[1]/60);
			let allSibilings = document.querySelectorAll('#'+aviabilities[i].name+aviabilities[i].surname.charAt(0)+ "-T div");
			let sibilingsHeight = 0;
			for(let j = 0; j < allSibilings.length; j++){
				sibilingsHeight += allSibilings[j].offsetHeight;
			}
	
			let pxOffset = ((hourOfStart - start_hour) * oneHourHeight) - sibilingsHeight;
			let pxHeight = turnLength * oneHourHeight;

			let turn = document.createElement("div");
			turn.textContent = start_date + " - " + end_date;
			turn.style = "height: " + pxHeight + "px; translate: 0px "+pxOffset+"px;";
			turn.id = "instructor-turn-box";
			turn.textContent += "\r\n" + turns[j].requester_name + " " + turns[j].requester_surname;
			if(turns[j].approved === null){
				turn.style = "height: " + pxHeight + "px; translate: 0px " + pxOffset + "px; background-color: crimson;";
			}

			document.querySelector('#'+aviabilities[i].name+aviabilities[i].surname.charAt(0)+"-T").appendChild(turn);
		}
	}
}


function turnsToLocalTime (turns){
	for(let i = 0; i < turns.length; i++){
		let utcStartDate = new Date(turns[i].start_date);
		utcStartDate.setHours(utcStartDate.getHours() + localTime);
		turns[i].start_date = utcStartDate.toISOString();
	
		let utcEndDate = new Date(turns[i].end_date);
		utcEndDate.setHours(utcEndDate.getHours() + localTime);
		turns[i].end_date = utcEndDate.toISOString(); 
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
		case "approved":
			descriptionTranslated = "aprovó";
			break;
		case "rejected":
			descriptionTranslated = "rechazó";
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
		case "turns":
			descriptionTranslated += " el turno";
			break;
	}
	descriptionTranslated += ": " + key;
	return descriptionTranslated;
}
