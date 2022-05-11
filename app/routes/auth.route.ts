import PromiseRouter from "express-promise-router";
import { authController } from "../controllers";

const router = PromiseRouter();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh-token", authController.refreshToken);

export default router;
