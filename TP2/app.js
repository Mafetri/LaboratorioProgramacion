import express from "express";
import newsRoutes from "./routes/news.routes.js";
import fleetRoutes from "./routes/fleet.routes.js";
import weatherRoutes from "./routes/weather.routes.js";
import coursesRoutes from "./routes/courses.routes.js";

const app= express();

app.use(express.json());

// APIs
app.use("/api", newsRoutes);
app.use("/api", fleetRoutes);
app.use("/api", weatherRoutes);
app.use("/api", coursesRoutes);

// Static webpage
app.use(express.static('static'));

export default app;
