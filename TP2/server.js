import express from "express";
import newsRoutes from "./routes/news.routes.js";
import weatherRoutes from "./routes/weather.routes.js";

const app= express();

// APIs
app.use(newsRoutes);

app.use(weatherRoutes);

// Static webpage
app.use(express.static('static'));

// Port'
const port = 3000;
app.listen(port);
console.log("Server running on port "+port);