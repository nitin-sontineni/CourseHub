import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function AddCourse() {
  const [open, setOpen] = React.useState(false);
  const [courseid, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');

  const courseIdChangeHandler = (event) => {
    setCourseId(event.target.value);
  };

  const courseNameChangeHandler = (event) => {
    setCourseName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    window.sessionStorage.setItem("new_course_name", courseName)
    window.sessionStorage.setItem("new_course_id", courseid)
    axios.post(
      "http://localhost:8080/professor/course/add",
        {
          "email" : window.sessionStorage.getItem("prof_email"),
          "courseId" : courseid,
          "courseName" : courseName
      }
      )
    .then(res => {
        console.log(res)
        window.location.href = "/profHomepage";
    })
    .catch(err => {
      alert(err);
    })
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{textTransform : 'none'}} onClick={handleClickOpen}>
        Add New Course
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>New Course</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Add New course
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="normal"
            id="id"
            label="Course ID"
            fullWidth
            variant="filled"
            required
            onChange={courseIdChangeHandler}
          />
          <TextField
            margin="normal"
            id="name"
            label="Course Name"
            type="email"
            fullWidth
            variant="filled"
            required
            onChange={courseNameChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
