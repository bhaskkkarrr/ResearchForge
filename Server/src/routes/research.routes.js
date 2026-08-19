import { Router } from "express";
import * as researchController from "../controllers/research_report.controller.js";
import isVerified from "../middleware/isVerified.middleware.js";
const researchRouter = Router();

researchRouter.post("/report", isVerified, researchController.research_report);
researchRouter.get(
  "/get-report/:id",
  isVerified,
  researchController.get_report,
);
researchRouter.get("/all-reports", isVerified, researchController.all_reports);
export default researchRouter;
