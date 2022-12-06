import { Router } from "express";
import { getNews, createNews, updateNews, deleteNews } from "../controllers/news.controller.js";
import { uploadNews } from "../controllers/uploader.js";

const router = Router();

router.get('/news', getNews); 

router.post('/news', uploadNews.single('file'), createNews);

router.patch('/news/:id', uploadNews.single('file'), updateNews);

router.delete('/news/:id', deleteNews);

export default router;