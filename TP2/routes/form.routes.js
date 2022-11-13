import { Router } from "express";

const router = Router();

router.post('/submitForm', (req, res) => {
    console.log(req.params);
}); 

export default router;
