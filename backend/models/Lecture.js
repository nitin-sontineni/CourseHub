const mongoose = require("mongoose");

//schema
const Schema = mongoose.Schema;
const LectureSchema = new Schema({
  lecNo: String,
  courseId: String,
  title: String,
  date: String,
  recordingLink: String,
  slidesLink: String,
});

//model
const Lecture = mongoose.model("Lecture", LectureSchema);
module.exports = Lecture;
