import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    schedule: [
        {
            day: {
                type: String,
                required: true,
            },
            timeSlots: [{ type: String, required: true }],
        },
    ],
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
        },
    ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
