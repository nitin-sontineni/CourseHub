const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    lecNo : String,
    timeStamp : String,
    rating : String, //integer
    feedBack: String,
    studentId : String,
    courseId : String
});

//model
const Review = mongoose.model('Review',ReviewSchema);
module.exports = Review;