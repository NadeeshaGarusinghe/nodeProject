const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    patientName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    time: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Appointment", appointmentSchema);