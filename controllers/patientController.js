import Patient from "../models/Patient.model.js";

const addPatient = async (req, res) => {
    try {
        const { patientId, name, disease, details } = req.body;
        if (!patientId || !name || !disease || !details) {
            return res.status(400).json({
                success: false,
                message:
                    "Please give all the details like patientId name disease details",
            });
        }

        const patient = await Patient.findOne({ patientId });
        if (patient) {
            return res.status(400).json({
                success: false,
                message: "Patient already existed!! Please login",
            });
        }

        const newPatient = new Patient({
            patientId,
            name,
            disease,
            details,
        });
        await newPatient.save();
        return res.status(200).json({
            success: true,
            message: "New Patient created successfully!!",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Please check addPatient in patientController",
        });
    }
};
const removePatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        const patient = await Patient.findOne({ patientId });
        if (!patient) {
            return res.status(400).json({
                success: false,
                message: "Patient not found",
            });
        }

        const removePatient = await Patient.findOneAndDelete({ patientId });
        return res.status(200).json({
            success: true,
            message: "Patient deleted successfully!!",
            RemovePatient: removePatient,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Please check removePatient in patientController",
        });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { name, disease, details } = req.body;
        const { patientId } = req.params;
        if (!name || !disease || !details) {
            return res.status(400).json({
                success: false,
                message:
                    "Please give all the details like patientId name disease details",
            });
        }
        const updatePatient = await Patient.findOneAndUpdate(
            { patientId },
            {
                name,
                disease,
                details,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Patient updated successfully!!",
            UpdatePatient: updatePatient,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Please check updatePatient in patientController",
        });
    }
};

const getAllPatient = async (req, res) => {
    try {
        const allPatient = await Patient.find();
        return res.status(200).json({
            success: true,
            message: "All Patient fetched successfully!!",
            AllPatient: allPatient,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Please check getAllPatient in patientController",
        });
    }
};

export { addPatient, removePatient, updatePatient, getAllPatient };
