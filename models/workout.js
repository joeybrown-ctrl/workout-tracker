const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

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

//make total duration function (this will be a column within the model that adds the duration of workouts and then puts that total to the
//front end. Check Thurs activities for custom models reference.)

workoutSchema.virtual('totalDuration').get(function () {
    let result = 0;
    this.exercises.forEach(element => {
        result += element.duration;
    });
    return result;
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;