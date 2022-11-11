import cursos from './requirements-curses.json' assert {type: 'json'};
import trajectory from './trajectory.json' assert {type: 'json'};
import fleet from '../fleet/fleet.json' assert {type: 'json'};
import news from '/api/news?x0=0&n=3' assert {type: 'json'};
import weather from '/api/weather' assert {type: 'json'};
import metar from '/api/metar' assert {type: 'json'}

// ===================== Trajectory =====================
document.querySelector('.alumnos p').textContent = trajectory.alumnos;
document.querySelector('.socios p').textContent = trajectory.socios;
document.querySelector('.aeronaves p').textContent = trajectory.aeronaves;
document.querySelector('.annos p').textContent = trajectory.annos;

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre' ,'Diciembre']

// ===================== News =====================
for(var i = news.length-1; i >= 0; i--){
  var thisNews = news[i];
  // Son of news
  var newsCard = document.createElement("div");
  newsCard.classList.add("news-card");

  // Son of newsCard
  var cardImg = document.createElement("img");
  cardImg.src = "."+thisNews.img;
  cardImg.alt = "Imagen de Noticia";

  // Son of newsCard
  var cardInfo = document.createElement("div");
  cardInfo.classList.add("news-card-info");

  // Sons of cardInfo
  var title = document.createElement("h2");
  title.textContent = thisNews.title;
  var line = document.createElement("hr");
  var description = document.createElement("p");
  description.textContent = thisNews.description;

  // Son of newsCard
  var date = document.createElement("h3");
  let dateArray = thisNews.date.split('-');
  date.textContent = dateArray[2].split('T')[0] + " " + months[dateArray[1]-1] + ", " + dateArray[0];

  document.querySelector(".news").prepend(newsCard);
  newsCard.appendChild(cardImg);
  newsCard.appendChild(cardInfo);
  newsCard.appendChild(date);
  cardInfo.appendChild(title);
  cardInfo.appendChild(line);
  cardInfo.appendChild(description);
}


// ===================== Courses =====================
// Json read and courses data modification
for (var i = 0; i < cursos.cursos.length; i++) {
  var clase = cursos.cursos[i].clase;
  document.querySelector("."+clase+".edad").textContent += cursos.cursos[i].edad;
  document.querySelector("."+clase+".duracion").textContent += cursos.cursos[i].duracion;
  document.querySelector("."+clase+".horas").textContent += cursos.cursos[i].horas;
  document.querySelector("."+clase+".estudios").textContent += cursos.cursos[i].estudios;
  document.querySelector("."+clase+".psicofisico").textContent += cursos.cursos[i].psicofisico;
  document.querySelector("."+clase+".licencias").textContent += cursos.cursos[i].licencias;
}


// ===================== Fleet =====================
for(var i = 0; i < fleet.airplanes.length; i++){
  var airplane = fleet.airplanes[i];
  var comment = document.createComment(airplane.name);

  var airplaneCard = document.createElement("div");
  airplaneCard.classList.add("carousel-item");

  var airplaneName = document.createElement("h2");
  airplaneName.textContent = airplane.name;
  airplaneName.classList.add("airplane-name");

  var airplaneInfo = document.createElement("p");
  airplaneInfo.textContent = airplane.plate;
  airplaneInfo.classList.add("airplane-info");

  var airplaneImg = document.createElement("img");
  airplaneImg.src = "."+airplane.img;
  airplaneImg.alt = "Imagen del " + airplane.name;

  document.querySelector("#fleet-carousel").appendChild(comment);
  document.querySelector("#fleet-carousel").appendChild(airplaneCard);
  airplaneCard.appendChild(airplaneName);
  airplaneCard.appendChild(airplaneInfo);
  airplaneCard.appendChild(airplaneImg);
}
// Fleet carousel
document.addEventListener("DOMContentLoaded", () => {
  const elementosCarrusel = document.querySelectorAll(".carousel");
  M.Carousel.init(elementosCarrusel, {
    duration: 50,
    dist: -100,
    shift: 5,
    padding: 5,
    indicators: true,
    noWrap: false,
    numVisible: 3
  });
});


// ===================== Weather =====================
document.querySelector(".viento").textContent = weather.wind_direction + "° " + weather.wind_speed + "kt";
document.querySelector(".qnh").textContent = weather.surface_pressure + " hpa";
document.querySelector(".temp").textContent = weather.temperature + "°C";
document.querySelector(".punto-rocio").textContent = weather.dewpoint + "°C";
document.querySelector(".nubes").textContent = weather.cloud_cover + "%";

document.querySelector(".metar-codified").textContent = metar.data;

