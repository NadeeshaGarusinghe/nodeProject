const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {

    //lets validate the data before we make a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("email already exist");

    //hash passsword
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        password: hashedpassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });

    } catch (err) {
        res.status(400).send(err);

    }


});

router.post("/login", async (req, res) => {
    //lets validate the data before login
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("email is wrong");

    //checking if the pswrd correct
    const validpas = await bcrypt.compare(req.body.password, user.password);
    if (!validpas) return req.status(400).send("password is incorrect");


    //create and assign a token
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET);     //encrypt all the details of the user by the secret  key
    res.header("auth-token", token).send(token);






});

module.exports = router;


