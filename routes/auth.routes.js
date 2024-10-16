import { Router } from "express";
import {
    logInAuth,
    logOutAuth,
    registerAuth,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", registerAuth);
router.post("/login", logInAuth);
router.post("/logout", logOutAuth);

export default router;