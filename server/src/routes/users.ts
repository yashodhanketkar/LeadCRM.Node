import { Router } from "express";
import { UsersController } from "../controllers/users.js";
import { admin } from "../middlewares/admin.js";
import { auth } from "../middlewares/jwt.js";

const router: Router = Router();
const ctrl = new UsersController();

router.get("/", [auth, admin], ctrl.getAll);
router.get("/:id", [auth, admin], ctrl.getById);
router.put("/setrole/:id", [auth, admin], ctrl.setRole);
router.put("/deactivate/:id", [auth, admin], ctrl.deactivate);

router.post("/register", ctrl.create);
router.post("/login", ctrl.login);

export { router as usersRouter };
