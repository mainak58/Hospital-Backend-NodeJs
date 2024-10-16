// import Appointment from "../models/Appointment.model.js";
// import Doctor from "../models/Docotor.model.js";

// const addAppointment = async (req, res) => {
//     try {
//         const { patient, doctor, date, timeSlot } = req.body;
//         if (!patient || !doctor || !date || !timeSlot) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     "Please give all the details like patient doctor date timeSlot",
//             });
//         }
//         const newAppointment = new Appointment({
//             patient,
//             doctor,
//             date,
//             timeSlot,
//         });
//         await newAppointment.save();
//         return res.status(200).json({
//             success: true,
//             message: "Appointment added successfully!!",
//             newAppointment: newAppointment,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Please check addAppointment in controller",
//         });
//     }
// };

// const deleteAppointment = async (req, res) => {
//     try {
//         const { appointmentId } = req.params;
//         if (!appointmentId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please give appointmentId",
//             });
//         }

//         const deleteAppointment = await Appointment.findOneAndDelete({
//             _id: appointmentId,
//         });
//         return res.status(200).json({
//             success: true,
//             message: "Appointment deleted successfully!!",
//             deleteAppointment: deleteAppointment,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Please check deleteAppointment in controller",
//         });
//     }
// };

// const updateAppointment = async (req, res) => {
//     try {
//         const { patient, doctorId, date, timeSlot } = req.body;
//         const { id } = req.params;
//         if (!patient || !doctor || !date || !timeSlot) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     "Please give all the details like patient doctor date timeSlot",
//             });
//         }

//         const doctor = await Doctor.findOne({ doctorId });
//         if (!doctor) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Doctor not found",
//             });
//         }

//         const updateAppointment = await Appointment.findOneAndUpdate(
//             { _id: id },
//             {
//                 patient,
//                 doctor,
//                 date,
//                 timeSlot,
//             },
//             { new: true }
//         );
//         if (updateAppointment) {
//             return res.status(200).json({
//                 success: true,
//                 message: "Appointment updated successfully!!",
//                 updateAppointment: updateAppointment,
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Please check updateAppointment in controller",
//         });
//     }
// };

// const getAllAppointment = async (req, res) => {
//     try {
//         const appointments = await Appointment.find();
//         if (!appointments) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "No appointment found" });
//         }
//         return res.status(200).json({
//             success: true,
//             message: "Appointments fetched successfully!!",
//             appointments: appointments,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Please check getAllAppointment in controller",
//         });
//     }
// };

// const selectAppointment = async (req, res) => {
//     try {
//         const { doctorId, date, timeSlot } = req.body;
//         const { patientId } = req.params;
//         if (!doctorId || !date || !timeSlot) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     "Please give all the details like doctorId date timeSlot",
//             });
//         }
//         const doctor = await Doctor.findOne({ doctorId });
//         if (!doctor) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Doctor not found",
//             });
//         }
//         const newAppointment = new Appointment({
//             patient: patientId,
//             doctor: doctorId,
//             date,
//             timeSlot,
//         });
//         await newAppointment.save();
//         return res.status(200).json({
//             success: true,
//             message: "Appointment selected successfully!!",
//             newAppointment: newAppointment,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Please check selectAppointment in controller",
//         });
//     }
// };

// export {
//     addAppointment,
//     deleteAppointment,
//     updateAppointment,
//     getAllAppointment,
//     selectAppointment,
// };

import Appointment from "../models/Appointment.model.js";
import Doctor from "../models/Doctor.model.js";
import { sendEmail } from "../services/emailService.js";

// Add Appointment
const addAppointment = async (req, res) => {
    try {
        const { patient, doctor, date, timeSlot } = req.body;

        if (!patient || !doctor || !date || !timeSlot) {
            return res.status(400).json({
                success: false,
                message:
                    "Please provide all required details: patient, doctor, date, and timeSlot.",
            });
        }

        const newAppointment = new Appointment({
            patient,
            doctor,
            date,
            timeSlot,
        });
        await newAppointment.save();

        const patientEmail = patient.email || "patient@example.com";
        await sendEmail(
            patientEmail,
            "Appointment Confirmation",
            `Your appointment with Doctor ${doctor} is scheduled for ${date} at ${timeSlot}.`
        );

        return res.status(200).json({
            success: true,
            message: "Appointment added successfully!",
            newAppointment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred in addAppointment.",
        });
    }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        if (!appointmentId) {
            return res.status(400).json({
                success: false,
                message: "Please provide appointmentId.",
            });
        }

        const deleteAppointment = await Appointment.findOneAndDelete({
            _id: appointmentId,
        });

        if (!deleteAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found.",
            });
        }

        const patientEmail =
            deleteAppointment.patient.email || "patient@example.com"; // Replace with actual patient's email from the DB
        await sendEmail(
            patientEmail,
            "Appointment Cancellation",
            `Your appointment scheduled for ${deleteAppointment.date} at ${deleteAppointment.timeSlot} has been canceled.`
        );

        return res.status(200).json({
            success: true,
            message: "Appointment deleted successfully!",
            deleteAppointment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred in deleteAppointment.",
        });
    }
};

// Update Appointment
const updateAppointment = async (req, res) => {
    try {
        const { patient, doctor, date, timeSlot } = req.body;
        const { id } = req.params;

        if (!patient || !doctor || !date || !timeSlot) {
            return res.status(400).json({
                success: false,
                message:
                    "Please provide all required details: patient, doctor, date, and timeSlot.",
            });
        }

        const doctorFound = await Doctor.findOne({ _id: doctor });

        if (!doctorFound) {
            return res.status(400).json({
                success: false,
                message: "Doctor not found.",
            });
        }

        const updatedAppointment = await Appointment.findOneAndUpdate(
            { _id: id },
            { patient, doctor, date, timeSlot },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found.",
            });
        }

        // Send email notification
        const patientEmail =
            updatedAppointment.patient.email || "patient@example.com";
        await sendEmail(
            patientEmail,
            "Appointment Update",
            `Your appointment has been updated to ${updatedAppointment.date} at ${updatedAppointment.timeSlot} with Doctor ${updatedAppointment.doctor}.`
        );

        return res.status(200).json({
            success: true,
            message: "Appointment updated successfully!",
            updatedAppointment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred in updateAppointment.",
        });
    }
};

// Get All Appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();

        if (!appointments.length) {
            return res.status(404).json({
                success: false,
                message: "No appointments found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully!",
            appointments,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred in getAllAppointments.",
        });
    }
};

const selectAppointment = async (req, res) => {
    try {
        const { doctorId, date, timeSlot } = req.body;
        const { patientId } = req.params;

        if (!doctorId || !date || !timeSlot) {
            return res.status(400).json({
                success: false,
                message: "Please provide doctorId, date, and timeSlot.",
            });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor not found.",
            });
        }

        const newAppointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            date,
            timeSlot,
        });
        await newAppointment.save();

        const patientEmail = "patient@example.com";
        await sendEmail(
            patientEmail,
            "Appointment Confirmation",
            `Your appointment with Doctor ${doctor.name} is confirmed for ${date} at ${timeSlot}.`
        );

        return res.status(200).json({
            success: true,
            message: "Appointment selected successfully!",
            newAppointment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred in selectAppointment.",
        });
    }
};

export {
    addAppointment,
    deleteAppointment,
    updateAppointment,
    getAllAppointments,
    selectAppointment,
};
