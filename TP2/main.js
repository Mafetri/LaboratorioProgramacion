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
var requisitosCursos = document.querySelector('.edad');
console.log(cursos.cursos[1]?.edad);
requisitosCursos.textContent = cursos.cursos[1]?.edad;
//var requisitosCursos = JSON.parse(cursos);
//const edad = document.querySelector("edad");
//edad.textContent= alert(requisitosCursos[0].edad);

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
