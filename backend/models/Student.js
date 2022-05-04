const mongoose = require("mongoose");
const Course = require("./Course");

//schema
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: String,
  studentId: String,
  password: String,
  courses: [], //////////////
  email: String,
});

//model
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
