import express from "express";
import {
  addToolsController,
  bulkAuditController,
  getToolsBySerialNoController,
  getToolsController,
  getToolsNameController,
  getToolsPhotoController,
  getToolsSerialController,
  toolCountController,
  toolListController,
  updateCalliberationController,
  updateStatusController,
} from "../controller/toolsController.js";

const router = express.Router();

router.post("/addTools", addToolsController);
router.get("/getTools", getToolsController);
router.get("/getTools/:serial", getToolsBySerialNoController);
router.get("/getToolsSerialNo/:name", getToolsSerialController);
router.get("/getToolsAudit", getToolsNameController); // will used for name
router.get("/getToolsPhoto/:tid", getToolsPhotoController);
router.get("/tools-list/:page", toolListController);
router.get("/count", toolCountController);
router.put("/updateStatus/:serial", updateStatusController);
router.put("/calliberated/:serial", updateCalliberationController);
router.put("/bulkAudit", bulkAuditController);

export default router;
