// letiables and Costants
let x0 = 0;
let n = 4;
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

// Variables to be modified if want to do a PUT 
let newsIdModify;
let newsDataModify = {
    imgRoute:"",
    date:"", 
    title:"",
    description:""
};

// First ejecution of createNews
createNews();

// Load More button, increases x0 and calls getNews
document.querySelector("#load-more").addEventListener("click", async () => {
	x0 += n;
	createNews();
});

// If the submit button of the modify-news-form is clicked
document.querySelector("#modify-news-form").addEventListener("submit", (e) => {
	e.preventDefault();

    // Extracts the values of the modify-news-form
    let title = document.querySelector("#modify-news-form-title").value;
    let imgRoute = document.querySelector("#modify-news-form-img").value;
    let description = document.querySelector("#modify-news-form-description").value;
    let date = document.querySelector("#modify-news-form-date").value;

    // If the value of the input its not null, it changes the original parameter with the new one
    if(title != "") newsDataModify.title = title;
    if(imgRoute != "") newsDataModify.imgRoute = imgRoute;
    if(description != "") newsDataModify.description = description;
    if(date != "") newsDataModify.date = date;

    // Uses XHR to post the form data
	let xhr = new XMLHttpRequest();
	xhr.open("PATCH", ("/api/news/"+newsIdModify));
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {
        // If the server sends a success
		if (xhr.responseText == "success") {
			img.value = "";
			date.value = "";
			title.value = "";
			description.value = "";
		}
	};

    xhr.send(JSON.stringify(newsDataModify));

    // Unce the news has been modified, it reloads the page on the #news ref
    window.location.replace("#news");
    window.location.reload();
});

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
		date.textContent =
			dateArray[2].split("T")[0] +
			" " +
			months[dateArray[1] - 1] +
			", " +
			dateArray[0];

		// Delete button
		let deleteNews = document.createElement("button");
		deleteNews.textContent = "Borrar";
		deleteNews.classList.add("delete-button");
		deleteNews.addEventListener("click", async () => {
			const res = await fetch("/api/news/" + news[i].id, {
				method: "DELETE",
			});
            window.location.reload();
		});

        // Modify button
        let modifyNews = document.createElement("a");
        modifyNews.href = "#modify-news-form-popup";
        modifyNews.textContent = "Modificar";
        modifyNews.classList.add("modify-button");
        modifyNews.addEventListener("click", async () => {
            // If the button "modify" is clicked, it changes the global values to
            // the pre modified or current news values
            newsIdModify = news[i].id;
            newsDataModify.imgRoute = news[i].img;
            newsDataModify.date = news[i].date.split("T")[0];
            newsDataModify.title = news[i].title;
            newsDataModify.description = news[i].description;
            
            // It shows in the placeholder the current value
            document.querySelector("#modify-news-form-date").value = newsDataModify.date;
            document.querySelector("#modify-news-form-title").placeholder = newsDataModify.title;
            document.querySelector("#modify-news-form-description").placeholder = newsDataModify.description;
            document.querySelector("#modify-news-form-img").placeholder = newsDataModify.imgRoute;
        });

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

/*
import fleet from '/api/fleet?x0=0&n=200' assert {type: 'json'};

// Info fleet
for (let i = 0; i < fleet.length; i++) {
    let airplane = fleet[i];
    //  ---  Card  ---
    let nameComment = document.createComment(airplane.name);
    let card = document.createElement("article");
    card.classList.add("airplane-card");

    //  ---  Airplane Img  ---
    let img = document.createElement("img");
    img.src = "../.."+airplane.img;
    img.alt = "Imagen del "+airplane.name;

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

    // ---  Appends  ---
    document.querySelector(".airplanes").appendChild(nameComment);
    document.querySelector(".airplanes").appendChild(card);
    card.appendChild(img);
    card.appendChild(airplaneInfo);
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
*/
