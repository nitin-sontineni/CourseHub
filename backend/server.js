const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const Course = require("./models/Course");
const Lecture = require("./models/Lecture");
const Note = require("./models/Note");
const Professor = require("./models/Professor");
const Review = require("./models/Review");
const Student = require("./models/Student");
const studentRouter = require("./routes/apiStudent")
const professorRouter = require("./routes/apiProfessor")

const app = express();
var cors = require('cors')

app.use(cors())
const PORT = process.env.PORT || 8080;

const MONGODB_URI =
  "mongodb+srv://niveshduppalapudi:niveshpwa@cluster0.7tmjz.mongodb.net/classroomdb?retryWrites=true&w=majority";
// const routes = require("./routes/student");
mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});


// const nCourse = new Professor(data);
// nCourse.save((error)=>{
//     if(error){
//         console.log('Error Course')
//     }
//     else{
//         console.log('Data saved');
//     }
// })

app.use(morgan("tiny"));
app.use("/student", studentRouter);
app.use("/professor", professorRouter);
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
