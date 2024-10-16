import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/connectDb.js";
import authRouter from "./routes/auth.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import patientRouter from "./routes/patient.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";

const app = express();

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT;
const mongo_url = process.env.MONGO_URl;

connectDb(mongo_url);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/patient", patientRouter);
app.use("/api/appointment", appointmentRouter);

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
