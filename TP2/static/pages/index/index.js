import cursos from './requirements-curses.json' assert {type: 'json'};
import trajectory from './trajectory.json' assert {type: 'json'};
import fleet from '../fleet/fleet.json' assert {type: 'json'};
import news from '/api/news?x0=0&n=3' assert {type: 'json'};

// ===================== Trajectory =====================
document.querySelector('.alumnos p').textContent = trajectory.alumnos;
document.querySelector('.socios p').textContent = trajectory.socios;
document.querySelector('.aeronaves p').textContent = trajectory.aeronaves;
document.querySelector('.annos p').textContent = trajectory.annos;


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
  date.textContent = thisNews.date;

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
const weatherApi = "https://api.open-meteo.com/v1/forecast?windspeed_unit=kn&current_weather=true&hourly=relativehumidity_2m,precipitation,cloudcover,dewpoint_2m,temperature_2m,surface_pressure&timezone=America%2FSao_Paulo&latitude=-38.95833333&longitude=-67.80277778";
const metarApi = "https://api.checkwx.com/metar/SAZN?x-api-key=d1b8e067265a43a4859df77708";
async function getWeather(){
  const climaFetch = await fetch(weatherApi);
  const clima = await climaFetch.json();
  document.querySelector(".viento").textContent = clima.current_weather.winddirection + "° " + clima.current_weather.windspeed + "kt";
  document.querySelector(".qnh").textContent = clima.hourly.surface_pressure[0] + " hpa";
  document.querySelector(".temp").textContent = clima.current_weather.temperature + "°C";
  document.querySelector(".punto-rocio").textContent = clima.hourly.dewpoint_2m[0] + "°C";
  document.querySelector(".nubes").textContent = clima.hourly.cloudcover[0] + "%";

  const metarFetch = await fetch(metarApi);
  const metar = await metarFetch.json();
  document.querySelector(".metar-codified").textContent = metar.data;
}
getWeather();
