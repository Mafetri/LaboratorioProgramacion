
import express from "express";
import newsRoutes from "./routes/news.routes.js";

const app= express();

app.use(newsRoutes);

app.listen(3000);

console.log("Server running on port 3000");