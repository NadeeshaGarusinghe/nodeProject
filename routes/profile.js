const router = require("express").Router();
const verifyToken = require("./verifyToken");

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

module.exports = router;