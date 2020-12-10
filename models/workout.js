//Pulling in necessary packages, access to schema and making sure the Mongoose virtual can work
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

//Mongoose schema
const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true
            },
            name: {
                type: String,
                trim: true
            },
            duration: {
                type: Number
            },
            distance: {
                type: Number
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            }
        }
    ]
}, opts);

//Virtual schema to show the total duration of workouts
workoutSchema.virtual('totalDuration').get(function () {
    let result = 0;
    this.exercises.forEach(element => {
        result += element.duration;
    });
    return result;
});

//Accessing + exporting the Mongoose model
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;