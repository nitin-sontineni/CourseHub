const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Note = require("../models/Note");
const Professor = require("../models/Professor");
const Review = require("../models/Review");
const Student = require("../models/Student");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
router.use(express.json());

router.post("/signup", (req, res) => {
  console.log(req.body);
  const newProfessor = new Professor({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  newProfessor.save((err) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      console.log("Added in professor");
      res.status(200).json({
        msg: "data has been stored in db",
      });
    }
  });
});

router.post("/login", (req, res) => {
  Professor.findOne({ email: req.body.email }, (err, foundProfessor) => {
    if (err) {
      console.log("error ", err);
      res.status(404);
    } else {
      if (foundProfessor) {
        if (foundProfessor.password === req.body.password) {
          res.send({ professor: foundProfessor, found: true, match: true });
        } else {
          res.send({ found: true, match: false });
        }
      } else {
        res.send({ found: false });
      }
    }
  });
});

//course api left
router.post("/course/content", (req, res) => {
  Lecture.find({ courseId: req.body.courseId })
    .then((lectures) => {
      res.send(lectures);
    })
    .catch((error) => {
      console.log("error", error);
    });
});

// prof cant add already exisiting course
router.post("/course/add", (req, res) => {
  Professor.findOne({ email: req.body.email }, (err, foundProfessor) => {
    if (err) {
      console.log(err);
    } else if (foundProfessor) {
      Course.findOne({ courseId: req.body.courseId }, (err, foundCourse) => {
        if (err) {
          console.log(err);
        } else if (!foundCourse) {
          const newCourse = new Course({
            courseId: req.body.courseId,
            courseName: req.body.courseName,
            profName: foundProfessor.name,
            studentIds: [],
          });
          newCourse.save((err, savedCourse) => {
            if (err) {
              console.log(err);
            } else {
              foundProfessor.courses = foundProfessor.courses.concat({
                courseId: savedCourse.courseId,
                courseName: savedCourse.courseName,
              });
              foundProfessor.save((err, savedProf) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send({ professor: savedProf, updated: true });
                }
              });
            }
          });
        }
      });
    }
  });
});

router.post("/course/details", (req, res) => {
  Course.findOne(
    {
      courseId: req.body.courseId,
    },
    (err, foundCourse) => {
      if (err) {
        console.log("error", error);
      } else {
        if (foundCourse) {
          Student.find({ studentId: { $in: foundCourse.studentIds } })
            .then((foundStudents) => {
              const toSend = foundStudents.map((fs) => ({ studentName: fs.name, studentId: fs.studentId }));
              res.send(toSend);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  );
});

router.post("/lecturelink", (req, res) => {
  Review.find(
    {
      $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }],
    },
    (err, foundReviews) => {
      if (err) {
        console.log("error", error);
      } else {
        res.send(foundReviews);
      }
    }
  );
});
router.post("/lecture/add", (req, res) => {
  const newLecture = new Lecture(req.body.lecture);
  newLecture.save((err, savedLecture) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      console.log("Added in lectures");
      res.send({ lectureid: savedLecture._id, message: "Lecture added" });
    }
  });
});

module.exports = router;
