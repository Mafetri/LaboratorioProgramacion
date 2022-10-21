// =====================  Header pegajoso =====================
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("pegajoso", window.scrollY > 0);
});

// Header responsive
const toggleButton = document.querySelector('.nav-button');
const navbarLinks = document.querySelector('.nav-links');
const header = document.querySelector("header");
var hamburguesa = true;
toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
  header.classList.toggle("solido");
  const lineas = document.querySelectorAll(".nav-bar");

  // Si esta en modo hamburguesa, hace la transicion
  if(hamburguesa){
    lineas[0].style = 'transform: rotate(45deg) translate(5px, 8px);'
    lineas[1].style = 'transform: translate(50px);'
    lineas[2].style = 'transform: rotate(-45deg) translate(5px, -8px);'
    hamburguesa = false;
  }else{
    lineas[0].style = ''
    lineas[1].style = ''
    lineas[2].style = ''
    hamburguesa = true;
  }
})