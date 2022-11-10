import express from "express";
import path from "path";
import {fileURLToPath} from 'url';
import newsRoutes from "./routes/news.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app= express();

app.use(newsRoutes);

app.listen(3000);

app.use(express.static('static'));

console.log("Server running on port 3000");