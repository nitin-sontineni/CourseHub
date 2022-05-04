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

  const courseIdChangeHandler = (event) => {
    setCourseId(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    console.log(courseid);
    axios.post(
      "http://localhost:8080/student/course/enroll",
        {
          "studentId" : window.sessionStorage.getItem("student_id"),
          "courseId" : courseid,
      }
      )
    .then(res => {
      console.log(res);
      window.location.href = "/homepage";
    })
    .catch(err => {
      alert(err);
    })

    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{textTransform : 'none'}} onClick={handleClickOpen}>
        Entroll to New Course
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>New Course</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
