const router = require("express").Router();
const { isValidObjectID } = require("mongoose");
const { workout } = require("../models");
const db = require("../models");

//get all workouts

router.get("/api/workouts", (req, res) => {
    db.workout.find({})
    .then((workoutResponse) => {
        res.json(workoutResponse);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});


//update one

router.put("/api/workouts/:id", (req, res) => {
    const { body, params } = req;

    db.workout.findByIdAndUpdate(params.id, {
        $push: { exercises: body }
    })
    .then((workoutResponse) => {
        res.json(workoutResponse);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
});

//create new workout

router.post("/api/workouts", (req, res) => {
    db.workout.create(req.body)
    .then((workoutResponse) => {
        res.json(workoutResponse);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

//get range

router.get("/api/workouts/range", (req, res) => {
    db.workout.find({})
    .then((workoutResponse) => {
        res.json(workoutResponse);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;