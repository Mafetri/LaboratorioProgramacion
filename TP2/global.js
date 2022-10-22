// =====================  Sticky Header  =====================
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

// Header responsive
const toggleButton = document.querySelector('.nav-button');
const navbarLinks = document.querySelector('.nav-links');
const header = document.querySelector("header");
var notBurger = true;
toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
  header.classList.toggle("solid");
  const lineas = document.querySelectorAll(".nav-bar");

  // If it isn't on burger mode, then
  if(notBurger){
    lineas[0].style = 'transform: rotate(45deg) translate(5px, 8px);'
    lineas[1].style = 'transform: translate(50px);'
    lineas[2].style = 'transform: rotate(-45deg) translate(5px, -8px);'
    notBurger = false;
  }else{
    lineas[0].style = ''
    lineas[1].style = ''
    lineas[2].style = ''
    notBurger = true;
  }
})