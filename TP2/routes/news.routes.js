import { Router } from "express";
import { getNews, createNew, updateNew, deleteNew } from "../controllers/news.controller.js";

const router=Router();

router.get('/api/news', getNews); 

router.post('/api/news', createNew);

router.put('/api/news', updateNew);

router.delete('/api/news/:id', deleteNew);

export default router;