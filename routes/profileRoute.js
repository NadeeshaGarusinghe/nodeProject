const router = require("express").Router();
const verifyToken = require("./verifyToken");
const Appointment = require("../models/Appoinment");
const user = require("../models/User");

router.get("/doctor", verifyToken, (req, res) => {
    if (req.user.type.localeCompare("doctor")) return res.status(401).send("unauthorized");
    res.json({
        profile: {
            name: req.user.name,
            description: "this is a doctor profile"
        }
    });
});


router.get("/patient", verifyToken, (req, res) => {
    if (req.user.type.localeCompare("patient")) return res.status(401).send("unauthorized");
    res.json({
        profile: {
            name: req.user.name,
            description: "this is a patient profile"
        }
    });

});

router.post("/changepassword", (req, res) => {
    res.send("change pwd");

});



router.post("/appointment", verifyToken, async (req, res) => {
    if (req.user.type.localeCompare("patient")) return res.status(401).send("unauthorized");
    const appointment = new Appointment({
        doctorName: req.body.doctorName,
        patientName: req.body.patientName,
        time: req.body.time
    });
    try {
        const savedAppointment = await appointment.save();
        res.send({ appointment: appointment });

    } catch (err) {
        res.status(400).send(err);

    }

});


router.get("/doctorList", verifyToken, async (req, res) => {
    const doctors = await user.find({ type: "doctor" });
    res.send(doctors);

});

module.exports = router;