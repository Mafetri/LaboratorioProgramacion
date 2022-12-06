import { Router } from "express";
import { submitForm, getForms} from "./form.controller.js";

const router = Router();

router.get('/form', getForms);

router.post('/form', submitForm);

export default router;
