import { Router } from "express";
import { getNews, createNews, updateNews, deleteNews } from "../controllers/news.controller.js";

const router = Router();

router.get('/api/news', getNews); 

router.post('/api/news', createNews);

router.patch('/api/news/:id', updateNews);

router.delete('/api/news/:id', deleteNews);

export default router;