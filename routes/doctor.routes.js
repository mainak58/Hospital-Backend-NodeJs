import { Router } from "express";
import {
    addDoctor,
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
} from "../controllers/doctorController.js";
import { authoriseRole, protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllDoctor);
router.post("/add", protect, authoriseRole("admin"), addDoctor);
router.put("/update/:doctorId", protect, authoriseRole("admin"), updateDoctor);
router.delete(
    "/delete/:doctorId",
    protect,
    authoriseRole("admin"),
    deleteDoctor
);

export default router;
