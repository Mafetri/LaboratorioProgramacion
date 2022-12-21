import { Router } from "express";
import { getAuditlog } from "./aditlog.controller.js";
import { isLoggedIn, isAdmin, canGetAuditlog } from "../../lib/auth.js";

const router = Router();

router.get('/auditlog', isLoggedIn, canGetAuditlog, getAuditlog);

export default router;

