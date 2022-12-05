import { Router } from "express";
import { getAuditlog } from "./aditlog.controller.js";

const router = Router();

router.get('/auditlog', getAuditlog);

export default router;

