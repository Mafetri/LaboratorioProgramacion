import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { NEWS_IMG_ROUTE, AIRPLANE_IMG_ROUTE } from "../config.js";

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

export const storageAirplane = multer.diskStorage({
	destination: (req, res, cb) => {
		cb(null, path.join(fileURLToPath(import.meta.url), "../../static", AIRPLANE_IMG_ROUTE));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

export const uploadAirplane = multer({
	storage: storageAirplane,
	limits: { fileSize: 1000000 },
});