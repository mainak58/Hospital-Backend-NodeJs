import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    appointmentId: {
        type: String,
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Booked",
    }, // Booked, Cancelled, Completed
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
