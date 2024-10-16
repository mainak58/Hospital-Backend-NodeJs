import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    disease: {
        type: String,
        required: true,
    },
    details: [
        {
            location: {
                type: String,
                required: true,
            },
            contact: {
                type: String,
                required: true,
            },
        },
    ],
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
