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

window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("pegajoso", window.scrollY > 0);
});


const toggleButton = document.getElementsByClassName('nav-button')[0]
const navbarLinks = document.getElementsByClassName('nav-links')[0]
const header = document.querySelector("header");

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
  header.classList.toggle("solido");
})

var cursos = JSON.parse(requisitosCursos);
const edad = document.querySelector("edad");
edad.textContent= alert(cursos[0].edad);
