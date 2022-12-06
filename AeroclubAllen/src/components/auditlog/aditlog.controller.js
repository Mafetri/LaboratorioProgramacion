// DAO
import auditlog from "./auditlog.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";

// Get Auditlog
export const getAuditlog = async (req, res) => {
	const { x0, n } = req.query;

	try {
		if(Number.isInteger(parseInt(n)) && Number.isInteger(parseInt(x0))){
			const audit = await auditlog.getAuditlog(x0,n);
			res.json(audit);
		} else {
			res.status(400).send("Some variables are not integer as expected");
		}
	} catch (e) {
        somethingWentWrong500(e, res);
	}
};