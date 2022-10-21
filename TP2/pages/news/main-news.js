import noticias from "./news.json" assert { type: "json" };

const grid = document.querySelector(".noticias-grid");

for (let i = 0; i < noticias.noticias.length; i++) {
  // <div> </div>
  var newListItem = document.createElement("div");
  //<div Class="noticias-tarjeta"> </div>
  newListItem.classList.add("noticias-tarjeta");
  grid.appendChild(newListItem);
  // Creamos la imagen
  var imagen = document.createElement("img");
  // Creamos el nuevo div
  var divNuevo = document.createElement("div");
  // Agregamos Clase al div
  divNuevo.classList.add("noticias-info");
  // Creamos titulo, descripcion y fecha
  var titulo = document.createElement("h2");
  var descripcion = document.createElement("p");
  var fecha = document.createElement("h3");
  // Seteamos el contenido con los datos leidos del json
  titulo.textContent = noticias.noticias[i].titulo;
  descripcion.textContent = noticias.noticias[i].descripcion;
  fecha.textContent = noticias.noticias[i].fecha;
  // Seteamos el contenido de la imagen
  imagen.src = noticias.noticias[i].img;
  imagen.alt = "imagen-noticia";
  // Agregamos noticias-info, la imagen y la fecha como hijo de noticias-tarjeta
  newListItem.appendChild(imagen);
  newListItem.appendChild(divNuevo);
  newListItem.appendChild(fecha);
  // Agregamos los hijos de noticias-info
  divNuevo.appendChild(titulo);
  divNuevo.appendChild(document.createElement("hr"));
  divNuevo.appendChild(descripcion);
}
