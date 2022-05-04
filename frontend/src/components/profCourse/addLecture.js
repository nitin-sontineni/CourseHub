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

export default function AddLecture() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [slides, setSlides] = useState('');

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const linkChangeHandler = (event) => {
    setLink(event.target.value);
  };

  const slidesChangeHandler = (event) => {
    setSlides(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    console.log(window.sessionStorage.getItem("course_id"))
    axios.post(
      "http://localhost:8080/professor/lecture/add",
        {
          "lecture" : {
          "lecNo" : window.sessionStorage.getItem("num_lectures"),
          "courseId" : window.sessionStorage.getItem("course_id"),
          "title" : title,
          "date" : date,
          "recordingLink" : link,
          "slidesLink" : slides
          }
      }
      )
    .then(res => {
        console.log(res)
        window.location.href = "/profCourse";
    })
    .catch(err => {
      alert(err);
    })
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{textTransform : 'none'}} onClick={handleClickOpen}>
        Add New Lecture
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>New Lecture</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Add New course
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="normal"
            id="date"
            label="Date of Lecture"
            type= "date"
            fullWidth
            variant="filled"
            required
            onChange={dateChangeHandler}
          />
          <TextField
            margin="normal"
            id="title"
            label="Lecture Title"
            fullWidth
            variant="filled"
            required
            onChange={titleChangeHandler}
          />
          <TextField
            margin="normal"
            id="link"
            label="Lecture Link"
            fullWidth
            variant="filled"
            required
            onChange={linkChangeHandler}
          />
          <TextField
            margin="normal"
            id="slides"
            label="Slides Link"
            fullWidth
            variant="filled"
            onChange={slidesChangeHandler}
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
