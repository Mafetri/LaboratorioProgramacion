import noticias from "./jsons/noticias.json" assert { type: "json" };

const grid = document.querySelector(".noticias-grid");

for (let i = 0; i < noticias.noticias.length; i++) {
  //var notis = noticias.noticias[i];
  // <div> </div>
  var newListItem = document.createElement("div");
  //<div Class="noticias-tarjeta"> </div>
  newListItem.classList.add("noticias-tarjeta");
  grid.appendChild(newListItem);
  //Creamos la imagen
  var imagen = document.createElement("img");
  //Creamos el nuevo div
  var newDiv = document.createElement("div");
  //Agregamos Clase al div
  newDiv.classList.add("noticias-info");
  //creamos titulo y descripcion
  var titulo = document.createElement("h2");
  var descripcion = document.createElement("p");
  //seteamos el contenido con los datos leidos del json
  titulo.textContent = noticias.noticias[i].titulo;
  descripcion.textContent = noticias.noticias[i].descripcion;
  //seteamos el contenido de la imagen
  imagen.src =
    "https://www.fi.uncoma.edu.ar/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-06-at-09.11.06-1024x723.jpeg";
  imagen.alt = "imagen-noticia";
  //agregamos noticias-info y la imagen como hijo de noticias-grid
  newListItem.appendChild(imagen);
  newListItem.appendChild(newDiv);
  //agregamos los hijos de noticias-info
  newDiv.appendChild(titulo);
  newDiv.appendChild(document.createElement("hr"));
  newDiv.appendChild(descripcion);
}
