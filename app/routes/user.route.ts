import PromiseRouter from "express-promise-router";
import { userController } from "../controllers";
import auth from "../middleware/auth";

const router = PromiseRouter();

router.get("/@me", auth(), userController.getMe);
router.post("/@me", auth(), userController.updateMe);
router.post("/@me/email", auth(), userController.updateEmail);
router.post("/@me/password", auth(), userController.updatePassword);
router.get("/@me/devices", auth(), userController.getDevices);
router.post("/@me/devices", auth(), userController.addDevice);
router.delete("/@me/devices/:deviceId", auth(), userController.removeDevice);
router.get("/@me/notifications", auth(), userController.getNotifications);
router.patch("/@me/devices/:deviceId", auth(), userController.updateDevice);

export default router;
