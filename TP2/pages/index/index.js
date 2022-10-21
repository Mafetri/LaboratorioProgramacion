import cursos from '../index/requirements-curses.json' assert {type: 'json'};
import trayectoria from '../index/trajectory.json' assert {type: 'json'};
import news from '../news/news.json' assert {type: 'json'};


// ===================== Trajectory =====================
document.querySelector('.alumnos p').textContent = trayectoria.alumnos;
document.querySelector('.socios p').textContent = trayectoria.socios;
document.querySelector('.aeronaves p').textContent = trayectoria.aeronaves;
document.querySelector('.annos p').textContent = trayectoria.annos;


// ===================== News =====================
for(var i = 0; i < 3; i++){
  document.querySelector(".news-card.card-"+i+" h2").textContent = news.news[i].title;
  document.querySelector(".news-card.card-"+i+" h3").textContent = news.news[i].date;
  document.querySelector(".news-card.card-"+i+" p").textContent = news.news[i].description;
  document.querySelector(".news-card.card-"+i+" img").src = news.news[i].img;
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
