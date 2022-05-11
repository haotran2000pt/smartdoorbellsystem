import PromiseRouter from "express-promise-router";
import authRouter from "./auth.route";
import deviceRouter from "./device.route";
import userRouter from "./user.route";
import notificationRouter from "./notification.route";

const router = PromiseRouter();

router.use(authRouter);
router.use("/devices", deviceRouter);
router.use("/users", userRouter);
router.use("/notifications", notificationRouter);

export default router;
