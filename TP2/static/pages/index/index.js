import courses from '/api/courses' assert {type: 'json'};
import trajectory from '/api/trajectory' assert {type: 'json'};
import fleet from '/api/fleet?x0=0&n=20' assert {type: 'json'};
import news from '/api/news?x0=0&n=3' assert {type: 'json'};
import weather from '/api/weather' assert {type: 'json'};
import metar from '/api/metar' assert {type: 'json'}


// ===================== Trajectory =====================
for(let i = 0; i < trajectory.length; i++){
  let thisTrajectory = trajectory[i];
  let comment = document.createComment(thisTrajectory.type);

  // Son of trajectory section
  let trajectoryContainer = document.createElement('div');
  trajectoryContainer.classList.add("trajectory-container");

  // Icon
  let icon = document.createElement("img");
  icon.src = trajectory[i].icon;
  icon.alt = "Icono de Informacion";

  // Data
  let data = document.createElement("p");
  data.textContent = trajectory[i].data;

  document.querySelector(".trajectory-grid").appendChild(comment);
  document.querySelector(".trajectory-grid").appendChild(trajectoryContainer);
  trajectoryContainer.appendChild(icon);
  trajectoryContainer.appendChild(data);
}


// ===================== News =====================
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre' ,'Diciembre']
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
  let dateArray = thisNews.date.split('-');
  date.textContent = dateArray[2].split('T')[0] + " " + months[dateArray[1]-1] + ", " + dateArray[0];

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
for (var i = 0; i < courses.length; i++) {
  var course_class = courses[i].class;
  document.querySelector("."+course_class+".edad").textContent += courses[i].age;
  document.querySelector("."+course_class+".duracion").textContent += courses[i].duration;
  document.querySelector("."+course_class+".horas").textContent += courses[i].hours + " Horas";
  document.querySelector("."+course_class+".estudios").textContent += courses[i].studies;
  document.querySelector("."+course_class+".psicofisico").textContent += courses[i].psychophysical;
  document.querySelector("."+course_class+".licencias").textContent += courses[i].licenses;
}


// ===================== Fleet =====================
for(var i = 0; i < fleet.length; i++){
  var airplane = fleet[i];
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
document.querySelector(".viento").textContent = weather.wind_direction + "° " + weather.wind_speed + "kt";
document.querySelector(".qnh").textContent = weather.surface_pressure + " hpa";
document.querySelector(".temp").textContent = weather.temperature + "°C";
document.querySelector(".punto-rocio").textContent = weather.dewpoint + "°C";
document.querySelector(".nubes").textContent = weather.cloud_cover + "%";

document.querySelector(".metar-codified").textContent = metar.data;

