import { Router } from "express";
import { auth } from "../middlewares/jwt.js";
import { LeadsController } from "../controllers/leads.js";
import { manager } from "../middlewares/admin.js";

const router: Router = Router();
const ctrl = new LeadsController();

router.get("/", [auth], ctrl.getAll);
router.get("/:id", [auth], ctrl.getById);
router.put("/status/:id", [auth], ctrl.updateStatus);
router.delete("/:id", [auth], ctrl.delete);
router.post("/", [auth], ctrl.create);

router.get("/manager/all", [auth, manager], ctrl.getAllManager);
router.get("/manager/:id", [auth, manager], ctrl.getByIdManager);

export { router as leadsRouter };
