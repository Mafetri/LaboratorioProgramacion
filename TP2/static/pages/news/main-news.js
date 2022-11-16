// Variables and Costants
let x0 = 0;
let n = 4;
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre' ,'Diciembre']

// First ejecution of createNews
createNews();

// Load More button, increases x0 and calls getNews
document.querySelector("#load-more").addEventListener('click', async () => {
  x0 += n;
  createNews();
})

// Get News, makes a get of news to the api from the position x0 with an n ammount of news
async function createNews(){
  let api = "/api/news?x0="+x0+"&n="+n;
  let news = await (await fetch(api)).json();

  for (let i = 0; i < news.length; i++) {
    // Div
    var newListItem = document.createElement("article");
  
    //<div Class="news-card"> </div>
    newListItem.classList.add("news-card");
    document.querySelector(".news-grid").appendChild(newListItem);
  
    // News img
    var img = document.createElement("img");
    img.src = "../.." + news[i].img;
    img.alt = "news-img";
  
    // News Info
    var divInfo = document.createElement("div");
    divInfo.classList.add("news-info");
  
    // Create title, description and date of the news-info
    var title = document.createElement("h2");
    var description = document.createElement("p");
    var date = document.createElement("h3");
    title.textContent = news[i].title;
    description.textContent = news[i].description;
    let dateArray = news[i].date.split('-');
    date.textContent = dateArray[2].split('T')[0] + " " + months[dateArray[1]-1] + ", " + dateArray[0];
    
    // Append news-info, the img and the date as child of news-card
    newListItem.appendChild(img);
    newListItem.appendChild(divInfo);
    newListItem.appendChild(date);
    // Agregamos los hijos de news-info
    divInfo.appendChild(title);
    divInfo.appendChild(document.createElement("hr"));
    divInfo.appendChild(description);
  }
}