// Data Base
import { somethingWentWrong500 } from "../../error/error.handler.js";
import news from "./news.dao.js";

// Where news imgs are saved
import { NEWS_IMG_ROUTE } from "../../config.js";

// Auditlog
import auditlog from "../auditlog/auditlog.dao.js";


// Get news
export const getNews = async (req, res) => {
	const { x0, n } = req.query;

	try {
		if(Number.isInteger(parseInt(n)) && Number.isInteger(parseInt(x0))){
			const rows = await news.getNews(x0, n);
			res.json(rows);
		} else {
			res.status(400).send("Some variables are not integer as expected");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Create news
export const createNews = async (req, res) => {
	const { date, title, description, imgName } = JSON.parse(req.body.data);

	if (date == null || title == null || description == null || imgName == null) {
		res.status(400).json({
			message: "Some data is null",
		});
	} else {
		const imgRoute = NEWS_IMG_ROUTE + "/" + imgName;

		try {
			await news.createNews(date, title, description, imgName);
			// Gets the id of the recently added news, and creates a log of it
			const rows = await news.getLastId();
			await auditlog.createLog(req.user.dni, "creation", "news", rows[0].id);
			res.send("success");
		} catch (e) {
			somethingWentWrong500(e, res);
		}
	}
};

// Update news
export const updateNews = async (req, res) => {
	const { id } = req.params;
	const { date, title, description, imgName } = JSON.parse(req.body.data);

	// If imgName is undefined (no img sent), then it gives a null imgRoute to sql
	let imgRoute = null;
	if(imgName != undefined){
		imgRoute = NEWS_IMG_ROUTE+"/"+imgName;
	}

	try {
		const dbRes = await news.updateNews(date, title, description, imgRoute, id);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "New not found",
			});
		} else {
			await auditlog.createLog(req.user.dni, "modification", "news", id);
			res.send("success");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Delete news
export const deleteNews = async (req, res) => {
	const { id } = req.params;

	try {
		const dbRes = await news.deleteNews(id);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "New not found",
			});
		} else {
			await auditlog.createLog(req.user.dni, "deletion", "news", id);
			res.send("News Deleted");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};