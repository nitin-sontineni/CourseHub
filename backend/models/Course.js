const mongoose = require("mongoose");

//schema
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  courseName: String,
  profName: String, ///////////
  courseId: String,
  studentIds :[String]
});

//model
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
