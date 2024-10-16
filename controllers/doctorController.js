import Doctor from "../models/Docotor.model.js";

const addDoctor = async (req, res) => {
    try {
        const { doctorId, name, specality, schedule, appointments } = req.body;
        if (!doctorId || !name || !specality || !schedule || !appointments) {
            res.status(400).json({
                success: false,
                message:
                    "Please give all the details like doctorId name specality schedule appointments",
            });
        }

        const doctor = await Doctor.findOne({ doctorId });
        if (doctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor already existed!! Please login",
            });
        }

        const newDoctor = new Doctor({
            doctorId,
            name,
            specality,
            schedule,
            appointments,
        });
        await newDoctor.save();

        return res.status(200).json({
            success: true,
            message: "New Doctor created successfully!!",
            doctor: newDoctor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Please check adddoctor in controllers",
        });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const { name, specality, schedule, appointments } = req.body;
        const { doctorId } = req.params;
        if (!name || !specality || !schedule || !appointments) {
            return res.status(400).json({
                success: false,
                message:
                    "Please give all the details like doctorId name specality schedule appointments",
            });
        }

        if (!doctorId) {
            res.status(400).json({
                success: false,
                message: "Doctor not found",
            });
        }

        const updateDoctor = await Doctor.findOneAndUpdate(
            { doctorId },
            {
                name,
                specality,
                schedule,
                appointments,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Doctor updated successfully!!",
            doctor: updateDoctor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Please check updateDoctor in controllers",
        });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: "Doctor not found",
            });
        }

        const deleteDoctor = await Doctor.findOneAndDelete({ doctorId });
        return res.status(200).json({
            success: true,
            message: "Doctor deleted successfully!!",
            doctor: deleteDoctor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Please check deleteDoctor in controllers",
        });
    }
};

const getAllDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.find();
        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully!!",
            doctor: doctor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Please check getAllDoctor in controllers",
        });
    }
};

export { addDoctor, updateDoctor, deleteDoctor, getAllDoctor };
