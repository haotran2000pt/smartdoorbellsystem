import PromiseRouter from "express-promise-router";
import { deviceController } from "../controllers";
import auth from "../middleware/auth";

const router = PromiseRouter();

router.post("/", auth(), deviceController.create);
router.post("/:deviceId/notifications", deviceController.createNotification);
router.get("/:deviceId", auth(), deviceController.getInfo);

export default router;
