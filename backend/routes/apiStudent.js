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


//done
router.post("/signup", (req, res) => {
  console.log(req.body);
  const newStudent = new Student({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    studentId: req.body.studentId,
  });
  newStudent.save((err) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      console.log("Added in student");
      res.status(200).json({
        msg: "data has been stored in db",
      });
    }
  });
});


//done
router.post("/login", (req, res) => {
  Student.findOne({ email: req.body.email }, (err, foundStudent) => {
    if (err) {
      console.log("error ", err);
      res.status(404);
    } else {

      if (foundStudent) {
        if (foundStudent.password === req.body.password) {
          res.send({ student: foundStudent, found: true, match: true });
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

// no multiple enrollments ********
//done
router.post("/course/enroll", (req, res) => {
  Student.findOne({ studentId: req.body.studentId }, (err, foundStudent) => {
    if (err) {
      console.log(err);
    } else if (foundStudent) {
      Course.findOne({ courseId: req.body.courseId }, (err, foundCourse) => {
        if (err) {
          console.log(err);
        } else if (foundCourse) {
          if(!foundCourse.studentIds.includes(foundStudent.studentId)){
            foundCourse.studentIds = foundCourse.studentIds.concat(foundStudent.studentId)
            foundCourse.save((err, savedCourse) => {
              if (err) console.log(err);
              else{
                foundStudent.courses = foundStudent.courses.concat({courseId : savedCourse.courseId , courseName : savedCourse.courseName});
                foundStudent.save((err,savedStudent) => {
                  if (err) console.log(err);
                  else{
                    res.send({ student: savedStudent, updated: true });
                  }
                  
                });
              }
  
            });

          } 
          else{
            res.send({updated : false});
          }
        }
      });
    }
  });
});

//done
router.post("/lecturelink", (req, res) => {
  let notesToSend = [];
  let reviewsToSend = [];
  let vidLink = null;
  Note.find({ $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }] }, (err, foundNotes) => {
    if (err) {
      console.log("error", error);
    } else {
      // console.log(foundNotes)
      notesToSend.push(foundNotes.filter((element) => element.public || element.studentId === req.body.studentId));
      console.log(notesToSend);
      //check
      Review.find(
        {
          $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }, { studentId: req.body.studentId }],
        },
        (err, foundReviews) => {
          if (err) {
            console.log("error", error);
          } else {
            reviewsToSend = foundReviews;
            res.send({ notes: notesToSend, reviews: reviewsToSend });
          }
        }
      );
    }
  });
  // Lecture.find(
  //   {
  //     $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }],
  //   },
  //   (err, foundLec) => {
  //     if (err) {
  //       console.log(err);
  //     } else if (foundLec) {
  //       vidLink = foundLec.recordingLink;
  //     }
  //   }
  // );
});

// send  {note  : {json object}}
//done
router.post("/note/add", (req, res) => {
  const newNote = new Note(req.body.note);
  newNote.save((err, savedNote) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      console.log("Added in notes");
      res.send({ noteid: savedNote._id, message: "Note added" });
    }
  });
});

//user can delete public notes
router.post("/note/delete", (req, res) => {
  Note.deleteOne({ _id: mongoose.Types.ObjectId(req.body.noteId) }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Note deleted" });
    }
  });
});

router.post("/note/update", (req, res) => {
  const note = req.body.note;
  Note.findById(note.noteId, (err, foundNote) => {
    if (err) {
      console.log(err);
    } else if (foundNote) {
      foundNote.content = note.content;
      foundNote.public = note.public;
      foundNote.save((err) => {
        if (err) console.log(err);
        else {
          res.send({ message: "Note updated" });
        }
      });
    }
  });
});

router.post("/review/add", (req, res) => {
  const newReview = new Review(req.body.review);
  newReview.save((err, savedReview) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      res.send({ reviewId: savedReview._id, message: "Review added" });
    }
  });
});

router.post("/review/delete", (req, res) => {
  //const newReview = new Review(req.body.review);
  Review.deleteOne({ _id: mongoose.Types.ObjectId(req.body.reviewId) }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Review deleted" });
    }
  });
});

module.exports = router;
