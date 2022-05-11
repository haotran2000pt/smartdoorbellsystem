import PromiseRouter from "express-promise-router";
import { notificationController } from "../controllers";

const router = PromiseRouter();

router.post("/", notificationController.create);

export default router;
