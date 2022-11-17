import { Router } from "express";
import { getNews, createNews, updateNews, deleteNews } from "../controllers/news.controller.js";

const router = Router();

router.get('/news', getNews); 

router.post('/news', createNews);

router.patch('/news/:id', updateNews);

router.delete('/news/:id', deleteNews);

export default router;