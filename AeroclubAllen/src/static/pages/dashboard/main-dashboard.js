// ================  Trajectory  ================
import trajectory from "/api/trajectory" assert { type: "json" };

for (let i = 0; i < trajectory.length; i++) {
	let thisTrajectory = trajectory[i];
	let comment = document.createComment(thisTrajectory.type);

	// Son of trajectory section
	let trajectoryContainer = document.createElement("div");
	trajectoryContainer.classList.add("trajectory-container");

	// Icon
	let icon = document.createElement("img");
	icon.src = "../." + trajectory[i].icon;
	icon.alt = "Icono de Informacion";

	// Data
	let data = document.createElement("p");
	data.textContent = trajectory[i].data;

	// Buttons
	let buttons = document.createElement("div");
	buttons.classList.add("buttons");

	// Delete button
	let deleteTrajectory = document.createElement("button");
	deleteTrajectory.textContent = "Borrar";
	deleteTrajectory.classList.add("delete-button");
	deleteTrajectory.addEventListener("click", async () => {
		if (window.confirm("Seguro que quiere borrar la trayectoria de " + trajectory[i].type + "?")) {
			const res = await fetch("/api/trajectory/" + trajectory[i].type, {
				method: "DELETE",
			});
			window.location.reload();
		}
	});

	// Modify button
	let modifyTrajectory = document.createElement("a");
	modifyTrajectory.href = "#modify-trajectory-form-popup";
	modifyTrajectory.textContent = "Modificar";
	modifyTrajectory.classList.add("modify-button");
	modifyTrajectory.addEventListener("click", async () => {
		// It fills the form with the current value of the trajectory
		document.querySelector("#modify-trajectory-form-type").innerHTML = "Modificando trajectoria: " + trajectory[i].type;
		document.querySelector("#modify-trajectory-form-icon").value = trajectory[i].icon;
		document.querySelector("#modify-trajectory-form-data").value = trajectory[i].data;
	});

	document.querySelector(".trajectory-grid").appendChild(comment);
	document.querySelector(".trajectory-grid").appendChild(trajectoryContainer);
	trajectoryContainer.appendChild(icon);
	trajectoryContainer.appendChild(data);
	trajectoryContainer.appendChild(buttons);
	buttons.appendChild(modifyTrajectory);
	buttons.appendChild(deleteTrajectory);
}

// ================  News  ================
// letiables and Costants
let x0 = 0;
let n = 8;

const months = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];

// First ejecution of createNews
createNews();

// Get News, makes a get of news to the api from the position x0 with an n ammount of news
async function createNews() {
	let api = "/api/news?x0=" + x0 + "&n=" + n;
	let news = await (await fetch(api)).json();

	for (let i = 0; i < news.length; i++) {
		// Div
		let newListItem = document.createElement("article");

		//<div Class="news-card"> </div>
		newListItem.classList.add("news-card");
		document.querySelector(".news-grid").appendChild(newListItem);

		// News img
		let img = document.createElement("img");
		img.src = "../.." + news[i].img;
		img.alt = "news-img";

		// News Info
		let divInfo = document.createElement("div");
		divInfo.classList.add("news-info");

		// Create title, description and date of the news-info
		let title = document.createElement("h2");
		let description = document.createElement("p");
		let date = document.createElement("h3");
		title.textContent = news[i].title;
		description.textContent = news[i].description;
		let dateArray = news[i].date.split("-");
		date.textContent = dateArray[2].split("T")[0] + " " + months[dateArray[1] - 1] + ", " + dateArray[0];

		// Delete button
		let deleteNews = document.createElement("button");
		deleteNews.textContent = "Borrar";
		deleteNews.classList.add("delete-button");
		deleteNews.addEventListener("click", async () => {
			if (window.confirm("Seguro que quiere borrar la noticia " + news[i].title + " (ID: " + news[i].id + ")" + "?")) {
				const res = await fetch("/api/news/" + news[i].id, {
					method: "DELETE",
				});
				window.location.reload();
			}
		});

		// Modify button
		let modifyNews = document.createElement("a");
		modifyNews.href = "#modify-news-form-popup";
		modifyNews.textContent = "Modificar";
		modifyNews.classList.add("modify-button");
		modifyNews.addEventListener("click", async () => {
			// It fills the form with the current value of the news
			document.querySelector("#modify-news-form-id").innerHTML = "Modificando ID: " + news[i].id;
			document.querySelector("#modify-news-form-date").value = news[i].date.split("T")[0];
			document.querySelector("#modify-news-form-title").value = news[i].title;
			document.querySelector("#modify-news-form-description").value = news[i].description;
		});

		// ID of the news
		let idNews = document.createElement("h3");
		idNews.classList.add("id");
		idNews.textContent = "ID Noticia: " + news[i].id;

		// Append news-info, the img and the date as child of news-card
		newListItem.appendChild(idNews);
		newListItem.appendChild(img);
		newListItem.appendChild(divInfo);
		newListItem.appendChild(date);
		newListItem.appendChild(modifyNews);
		newListItem.appendChild(deleteNews);

		// Agregamos los hijos de news-info
		divInfo.appendChild(title);
		divInfo.appendChild(document.createElement("hr"));
		divInfo.appendChild(description);
	}
}

// Load More button, increases x0 and calls getNews
document.querySelector("#load-more").addEventListener("click", async () => {
	x0 += n;
	createNews();
});

// Modify News PATCH
document.querySelector("#modify-news-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let newsDataModify = {
		date: document.querySelector("#modify-news-form-date").value,
		title: document.querySelector("#modify-news-form-title").value,
		description: document.querySelector("#modify-news-form-description").value,
	};

	if(document.querySelector("#modify-news-form-imgFile").files.length != 0){
		newsDataModify.imgName = document.querySelector("#modify-news-form-imgFile").files[0].name;
	}

	let toSend = new FormData();
	toSend.append('data', JSON.stringify(newsDataModify));
	toSend.append('file', document.querySelector("#modify-news-form-imgFile").files[0]);

	// Uses XHR to post the form data
	let xhr = new XMLHttpRequest();
	xhr.open("PATCH", "/api/news/" + document.querySelector("#modify-news-form-id").innerHTML.split(" ")[2]);
	xhr.onload = function () {
		// If the server sends a success
		if (xhr.responseText == "success") {
			img.value = "";
			date.value = "";
			title.value = "";
			description.value = "";
		}
	};

	xhr.send(toSend);

	// Unce the news has been modified, it reloads the page on the #news ref
	window.location.replace("#news");
	window.location.reload();
});

// Create News POST
document.querySelector("#create-news-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let newData = {
		imgName: document.querySelector("#create-news-form-imgFile").files[0].name,
		date: document.querySelector("#create-news-form-date").value,
		title: document.querySelector("#create-news-form-title").value,
		description: document.querySelector("#create-news-form-description").value,
	};

	let toSend = new FormData();
	toSend.append('data', JSON.stringify(newData));
	toSend.append('file', document.querySelector("#create-news-form-imgFile").files[0]);

	// Uses XHR to post the form data
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/news");
	xhr.onload = function () {
		// If the server sends a success
		if (xhr.responseText == "Post Success") {
			img.value = "";
			date.value = "";
			title.value = "";
			description.value = "";
		}
	};

	xhr.send(toSend);

	// Unce the news has been modified, it reloads the page on the #news ref
	window.location.replace("#news");
	window.location.reload();
});



// ================  Fleet  ================
import fleet from "/api/fleet?x0=0&n=200" assert { type: "json" };

// Creates all fleet cards
for (let i = 0; i < fleet.length; i++) {
	let airplane = fleet[i];
	//  ---  Card  ---
	let nameComment = document.createComment(airplane.name);
	let card = document.createElement("article");
	card.classList.add("airplane-card");

	//  ---  Airplane Img  ---
	let img = document.createElement("img");
	img.src = "../.." + airplane.img;
	img.alt = "Imagen del " + airplane.name;

	//  ---  Airplane Info  ---
	let airplaneInfo = document.createElement("div");
	airplaneInfo.classList.add("airplane-info");

	// Name
	let name = document.createElement("h2");
	name.textContent = airplane.name;

	// Line
	let hr = document.createElement("hr");

	// Plate
	let plateTitle = document.createElement("h3");
	plateTitle.textContent = "Matricula:";
	let plate = document.createElement("p");
	plate.textContent = airplane.plate;

	// Engine
	let engineTitle = document.createElement("h3");
	engineTitle.textContent = "Motor:";
	let engine = document.createElement("p");
	engine.textContent = airplane.engine;

	// Brand
	let brandTitle = document.createElement("h3");
	brandTitle.textContent = "Marca:";
	let brand = document.createElement("p");
	brand.textContent = airplane.brand;

	// Model
	let modelTitle = document.createElement("h3");
	modelTitle.textContent = "Modelo:";
	let model = document.createElement("p");
	model.textContent = airplane.model;

	// Speed
	let speedTitle = document.createElement("h3");
	speedTitle.textContent = "Velocidad Curcero:";
	let speed = document.createElement("p");
	speed.textContent = airplane.speed + "kt";

	// Consumption
	let consumptionTitle = document.createElement("h3");
	consumptionTitle.textContent = "Consumo:";
	let consumption = document.createElement("p");
	consumption.textContent = airplane.consumption + "lt/h";

	// Delete button
	let deleteAirplane = document.createElement("button");
	deleteAirplane.textContent = "Borrar";
	deleteAirplane.classList.add("delete-button");
	deleteAirplane.addEventListener("click", async () => {
		if (window.confirm("Seguro que quiere borrar el " + airplane.name + "(" + airplane.plate + ")" + "?")) {
			const res = await fetch("/api/airplane/" + airplane.plate, {
				method: "DELETE",
			});
			window.location.reload();
		}
	});

	// Modify button
	let modifyAirplane = document.createElement("a");
	modifyAirplane.href = "#modify-airplane-form-popup";
	modifyAirplane.textContent = "Modificar";
	modifyAirplane.classList.add("modify-button");
	modifyAirplane.addEventListener("click", async () => {
		// It fills the form with the current value of the news
		document.querySelector("#modify-airplane-form-plate").innerHTML = "Modificando Matricula: " + airplane.plate;
		document.querySelector("#modify-airplane-form-name").value = airplane.name;
		document.querySelector("#modify-airplane-form-engine").value = airplane.engine;
		document.querySelector("#modify-airplane-form-brand").value = airplane.brand;
		document.querySelector("#modify-airplane-form-model").value = airplane.model;
		document.querySelector("#modify-airplane-form-speed").value = airplane.speed;
		document.querySelector("#modify-airplane-form-consumption").value = airplane.consumption;
	});

	// ---  Appends  ---
	document.querySelector("#fleet-grid").appendChild(nameComment);
	document.querySelector("#fleet-grid").appendChild(card);
	card.appendChild(img);
	card.appendChild(airplaneInfo);
	card.appendChild(modifyAirplane);
	card.appendChild(deleteAirplane);
	airplaneInfo.appendChild(name);
	airplaneInfo.appendChild(hr);
	airplaneInfo.appendChild(plateTitle);
	airplaneInfo.appendChild(plate);
	airplaneInfo.appendChild(engineTitle);
	airplaneInfo.appendChild(engine);
	airplaneInfo.appendChild(brandTitle);
	airplaneInfo.appendChild(brand);
	airplaneInfo.appendChild(modelTitle);
	airplaneInfo.appendChild(model);
	airplaneInfo.appendChild(speedTitle);
	airplaneInfo.appendChild(speed);
	airplaneInfo.appendChild(consumptionTitle);
	airplaneInfo.appendChild(consumption);
}

// Modify Airplane PATCH
document.querySelector("#modify-airplane-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let dataModify = {
		engine: document.querySelector("#modify-airplane-form-engine").value,
		brand: document.querySelector("#modify-airplane-form-brand").value,
		model: document.querySelector("#modify-airplane-form-model").value,
		speed: document.querySelector("#modify-airplane-form-speed").value,
		consumption: document.querySelector("#modify-airplane-form-consumption").value,
		name: document.querySelector("#modify-airplane-form-name").value,
	};

	if(document.querySelector("#modify-airplane-form-imgFile").files.length != 0){
		dataModify.imgName = document.querySelector("#modify-airplane-form-imgFile").files[0].name;
	}

	let toSend = new FormData();
	toSend.append('data', JSON.stringify(dataModify));
	toSend.append('file', document.querySelector("#modify-airplane-form-imgFile").files[0]);

	// Uses XHR to post the form data
	let xhr = new XMLHttpRequest();
	xhr.open("PATCH", "/api/airplane/" + document.querySelector("#modify-airplane-form-plate").innerHTML.split(" ")[2]);
	xhr.onload = function () {
		// If the server sends a success
		if (xhr.responseText == "success") {
			engine.value = "";
			brand.value = "";
			model.value = "";
			speed.value = "";
			consumption.value = "";
			img.value = "";
		}
	};

	xhr.send(toSend);

	// Unce the news has been modified, it reloads the page on the #fleet ref
	window.location.replace("#fleet");
	window.location.reload();
});

// Create Airplane POST
document.querySelector("#create-airplane-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let newData = {
		imgName: document.querySelector("#create-airplane-form-imgFile").files[0].name,
		plate: document.querySelector("#create-airplane-form-plate").value,
		engine: document.querySelector("#create-airplane-form-engine").value,
		brand: document.querySelector("#create-airplane-form-brand").value,
		model: document.querySelector("#create-airplane-form-model").value,
		speed: document.querySelector("#create-airplane-form-speed").value,
		consumption: document.querySelector("#create-airplane-form-consumption").value,
		name: document.querySelector("#create-airplane-form-name").value,
	};

	let toSend = new FormData();
	toSend.append('data', JSON.stringify(newData));
	toSend.append('file', document.querySelector("#create-airplane-form-imgFile").files[0]);

	// Uses XHR to post the form data
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/airplane");
	xhr.onload = function () {
		// If the server sends a success
		if (xhr.responseText == "Post Success") {
			plate.value = "";
			engine.value = "";
			brand.value = "";
			model.value = "";
			speed.value = "";
			consumption.value = "";
			img.value = "";
		} else {
			alert("Hubo un error en la creacion del avion");
		}
	};

	xhr.send(toSend);

	// Unce the news has been modified, it reloads the page on the #fleet ref
	window.location.replace("#fleet");
	window.location.reload();
});

// ================  Users  ================
const users = await (await fetch("/api/users")).json();

// If the ammount of users is grater than 0, it fills the table with the users
// if not, it deletes all the section of users
if(users.length > 0){
	// Fills the users table
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

	// Creation form send
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
			if (xhr.responseText == "Post Success") {
				dni.value = "";
				role.value = "";
			}
		};
	
		xhr.send(JSON.stringify(newData));
	
		// Unce the news has been modified, it reloads the page on the #news ref
		window.location.replace("#users");
		window.location.reload();
	});
	
	// Modification form send
	document.querySelector("#modify-user-form").addEventListener("submit", (e) => {
		e.preventDefault();
	
		let newData = {
			name: document.querySelector("#modify-user-form-name").value,
			surname: document.querySelector("#modify-user-form-surname").value,
			role: document.querySelector("#modify-user-form-role").value,
		};
	
		// Uses XHR to post the form data
		let xhr = new XMLHttpRequest();
		xhr.open("PATCH", "/api/user/" + document.querySelector("#modify-user-form-dni").innerHTML.split(" ")[2]);
		xhr.setRequestHeader("content-type", "application/json");
		xhr.onload = function () {
			// If the server sends a success
			if (xhr.responseText == "Post Success") {
				name.value = "";
				surname.value = "";
				role.value = "";
			}
		};
	
		xhr.send(JSON.stringify(newData));
	
		window.location.replace("#users");
		window.location.reload();
	});

	// Auditlog table fill
	const auditlog = await (await fetch("/api/auditlog?x0=0&n=20")).json();

	for(let i = 0; i < users.length; i++){
		let newListItem = document.createElement("tr");

		let date = document.createElement("td");
		let dateArray = auditlog[i].date.split('T')[0].split('-');
		let timeArray = auditlog[i].date.split("T")[1].split(':');
		date.textContent = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1]+" UTC";

		let description = document.createElement("td");
		let user = (users.filter((u)=>{return u.dni == auditlog[i].user_dni}))[0];
		description.textContent = user.name + " " + user.surname + " " + descriptionTranslation(auditlog[i].description, auditlog[i].table_name, auditlog[i].primary_key_changed);

		document.querySelector("#auditlog-table").appendChild(newListItem);
		newListItem.appendChild(date);
		newListItem.appendChild(description);
	}
} else {
	document.querySelector(".users").remove();
}

function roleTranslation(role){
	switch(role){
		case 'admin': return "Administrador";
		case 'editor': return "Editor";
		case 'pilot': return "Piloto";
		case 'student': return "Alumno";
	}
}

function descriptionTranslation (description, tableName, key) {
	let descriptionTranslated;
	switch(description){
		case 'modification': descriptionTranslated = 'modificó'; break;
		case 'creation': descriptionTranslated = 'creó'; break;
		case 'deletion': descriptionTranslated = 'eliminó'; break;
	}
	switch(tableName){
		case 'fleet': descriptionTranslated += " el avión"; break;
		case 'news': descriptionTranslated += " la noticia"; break;
		case 'users': descriptionTranslated += " el usuario"; break;
	}
	descriptionTranslated += ": " + key;
	return descriptionTranslated;
}


