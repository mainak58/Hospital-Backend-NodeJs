
const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const isValidAppointmentDate = (date) => {
    const today = new Date();
    const appointmentDate = new Date(date);
    return appointmentDate >= today;
};


const generateRandomString = (length = 10) => {
    return Math.random().toString(36).substr(2, length);
};


export {formatDate, isValidEmail, isValidAppointmentDate, generateRandomString}