import { Router } from "express";
import { getAuditlog } from "./aditlog.controller.js";
import { isLoggedIn, isAdmin } from "../../lib/auth.js";

const router = Router();

router.get('/auditlog', isLoggedIn, isAdmin, getAuditlog);

export default router;

