import { Router } from "express";
import { getNews, createNews, updateNews, deleteNews } from "./news.controller.js";
import { uploadNews } from "../../multer/uploader.js";
import { isLoggedIn } from "../../lib/auth.js";

const router = Router();

router.get('/news', getNews); 

router.post('/news', isLoggedIn, uploadNews.single('file'), createNews);

router.patch('/news/:id', isLoggedIn, uploadNews.single('file'), updateNews);

router.delete('/news/:id', isLoggedIn, deleteNews);

export default router;