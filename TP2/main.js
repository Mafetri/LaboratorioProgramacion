import cursos from './jsons/requisitosCursos.json' assert {type: 'json'};
import trayectoria from './jsons/trayectoria.json' assert {type: 'json'};

// Header pegajoso
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("pegajoso", window.scrollY > 0);
});

// Header responsive
const toggleButton = document.getElementsByClassName('nav-button')[0]
const navbarLinks = document.getElementsByClassName('nav-links')[0]
const header = document.querySelector("header");

// Navbar responsive
toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
  header.classList.toggle("solido");
})

// Trayectoria
document.querySelector('.alumnos p').textContent = trayectoria.alumnos;
document.querySelector('.socios p').textContent = trayectoria.socios;
document.querySelector('.aeronaves p').textContent = trayectoria.aeronaves;
document.querySelector('.annos p').textContent = trayectoria.annos;

// Info cursos
for (var i = 0; i < cursos.cursos.length; i++) {
  var clase = cursos.cursos[i].clase;
  document.querySelector("."+clase+".edad").textContent += cursos.cursos[i].edad;
  document.querySelector("."+clase+".duracion").textContent += cursos.cursos[i].duracion;
  document.querySelector("."+clase+".horas").textContent += cursos.cursos[i].horas;
  document.querySelector("."+clase+".estudios").textContent += cursos.cursos[i].estudios;
  document.querySelector("."+clase+".psicofisico").textContent += cursos.cursos[i].psicofisico;
  document.querySelector("."+clase+".licencias").textContent += cursos.cursos[i].licencias;
}

// Carrusel flota
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

// Clima
const climaApi = "https://api.open-meteo.com/v1/forecast?windspeed_unit=kn&current_weather=true&hourly=relativehumidity_2m,precipitation,cloudcover,dewpoint_2m,temperature_2m,surface_pressure&timezone=America%2FSao_Paulo&latitude=-38.95833333&longitude=-67.80277778";
async function getClima(){
  const buscar = await fetch(climaApi);
  const clima = await buscar.json();
  document.querySelector(".viento").textContent = clima.current_weather.winddirection + " / " + clima.current_weather.windspeed + "kt";
  document.querySelector(".qnh").textContent = clima.hourly.surface_pressure[0] + "hpa";
  document.querySelector(".temp").textContent = clima.current_weather.temperature + "°C";
  document.querySelector(".punto-rocio").textContent = clima.hourly.dewpoint_2m[0] + "°C";
  document.querySelector(".nubes").textContent = clima.hourly.cloudcover[0] + "%";
}

getClima();


