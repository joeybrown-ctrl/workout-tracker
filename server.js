//Packages and other files needed
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes.js");

//Setting up port
const PORT = process.env.PORT || 3000;

//Pulling in access to models folder
const db = require("./models");

//Pulling in express
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


//Setting up mongoose connection to atlasDB
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout-tracker',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);


//html routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

//Access to API Routes
app.use(apiRoutes);

//Server listener
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});