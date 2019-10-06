const express = require("express");
const app = express();
const Userroute = require("./routes/UserRoute");
const profileRoute = require("./routes/profileRoute");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

//connect to database
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("connected to DB!"));


//middleware
app.use(express.json());                                 //to recognize the incoming Request Object as a JSON Object
app.use(cors());
app.use("/hospital/user", Userroute);
app.use("/hospital/user/profile", profileRoute);

app.listen(3001, () => console.log("server is up and running"));