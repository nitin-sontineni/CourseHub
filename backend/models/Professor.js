const mongoose = require("mongoose");
const Course = require("../models/Course");
//schema
const Schema = mongoose.Schema;
const ProfessorSchema = new Schema({
  name: String,
  courses: [], ////////////
  email: String,
  password: String,
});

//model
const Professor = mongoose.model("Professor", ProfessorSchema);
module.exports = Professor;
