import { Router } from "express";
import {
    addPatient,
    removePatient,
    updatePatient,
    getAllPatient,
} from "../controllers/patientController.js";
import { authoriseRole, protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllPatient);
router.post("/add", protect, authoriseRole("admin"), addPatient);
router.put(
    "/update/:patientId",
    protect,
    authoriseRole("admin"),
    updatePatient
);
router.delete(
    "/delete/:patientId",
    protect,
    authoriseRole("admin"),
    removePatient
);

export default router;
