import { Router } from "express";
import {
    addAppointment,
    deleteAppointment,
    updateAppointment,
    getAllAppointment,
    selectAppointment,
} from "../appointments/appointment.controller.js";

import { protect, authoriseRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllAppointment);
router.post("/add", protect, authoriseRole("admin"), addAppointment);
router.put("/update/:id", protect, authoriseRole("admin"), updateAppointment);
router.delete(
    "/delete/:id",
    protect,
    authoriseRole("admin"),
    deleteAppointment
);
router.post("/select/:id", protect, authoriseRole("admin"), selectAppointment);

export default router;
