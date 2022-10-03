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

/*
document.querySelector('.ppa #boton-dorso').onclick = function() {
  console.log("hola");
  document.querySelector('#boton-dorso').id = 'boton-frente';
  document.querySelector('.ppa img').style.display = '';
  document.querySelector('.ppa div').style.display = 'none';
}

*/


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
