// Multer
import multer from "multer";

// Path join
import path from "path";
import { fileURLToPath } from "url";

// Where news and fleet imgs are saved
import { NEWS_IMG_ROUTE, AIRPLANE_IMG_ROUTE } from "../config.js";

// fs to create folder if to exists
import fs from "fs";

// Multer for News
export const storageNews = multer.diskStorage({
	destination: (req, res, cb) => {
		cb(null, path.join(fileURLToPath(import.meta.url), "../../static", NEWS_IMG_ROUTE));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
export const uploadNews = multer({
	storage: storageNews,
	limits: { fileSize: 1000000 },
});


// Multer for Airplane
export const storageAirplane = multer.diskStorage({
	destination: (req, res, cb) => {
		// The route is onto the static folder, what AIRPLANE_IMG_ROUTE says and the folder named as the name of the airplane
		const route = path.join(fileURLToPath(import.meta.url), "../../static", AIRPLANE_IMG_ROUTE, JSON.parse(req.body.data).name);
		fs.mkdirSync(route, { recursive: true })
		cb(null, route);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
export const uploadAirplane = multer({
	storage: storageAirplane,
	limits: { fileSize: 1000000 },
});