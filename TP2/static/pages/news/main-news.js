import news from "/api/news?x0=0&n=20" assert { type: "json" };

const grid = document.querySelector(".news-grid");

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre' ,'Diciembre']

for (let i = 0; i < news.length; i++) {
  // Div
  var newListItem = document.createElement("article");

  //<div Class="news-card"> </div>
  newListItem.classList.add("news-card");
  grid.appendChild(newListItem);

  // News img
  var img = document.createElement("img");
  img.src = "../.." + news[i].img;
  img.alt = "news-img";

  // News Info
  var divInfo = document.createElement("div");
  divInfo.classList.add("news-info");

  // Create title, description and date of the news-info
  var title = document.createElement("h2");
  var description = document.createElement("p");
  var date = document.createElement("h3");
  title.textContent = news[i].title;
  description.textContent = news[i].description;
  let dateArray = news[i].date.split('-');
  date.textContent = dateArray[2].split('T')[0] + " " + months[dateArray[1]-1] + ", " + dateArray[0];
  
  // Append news-info, the img and the date as child of news-card
  newListItem.appendChild(img);
  newListItem.appendChild(divInfo);
  newListItem.appendChild(date);
  // Agregamos los hijos de news-info
  divInfo.appendChild(title);
  divInfo.appendChild(document.createElement("hr"));
  divInfo.appendChild(description);
}
