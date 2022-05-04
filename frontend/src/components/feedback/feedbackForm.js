import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import Feedbacks from "./feedbacks.js";

const labels = {
  1: 'Poor',
  2: 'Bad',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function TakeFeedback() {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = useState('');
  const [value, setValue] = React.useState();
  const [hover, setHover] = React.useState(-1);
  
  
  const feedbackChangeHandler = (event) => {
    setFeedback(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    console.log(value, feedback)
    axios.post(
      "http://localhost:8080/student/review/add",
        {
          "review" : 
          {
            "lecNo" : "1",
            "timeStamp" : window.sessionStorage.getItem("playedTime"),
            "rating" : value.toString(),
            "feeback" : feedback,
            "studentId" : window.sessionStorage.getItem("student_id"),
            "course_id" : window.sessionStorage.getItem("course_id")
          }
      }
      )
    .then(res => { 
      console.log(res)
    })
    .catch(err => {
      alert(err);
    })
    setOpen(false);
  };

  var playedTime = window.sessionStorage.getItem("playedTime");
  var button_title = `Give your feedback at ${playedTime}`

  return (
    <div>
    <Box marginLeft={30}>
      <Button variant="outlined" style={{textTransform : 'none', padding: 5 }} onClick={handleClickOpen}>
        {button_title}
      </Button>
      </Box>
      <Dialog open={open} onClose={handleCancel} fullWidth >
        <DialogTitle>Feedback</DialogTitle>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            margin: 2
          }}
        >
        <Rating
          name="hover-feedback"
          value={value}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
        </Box>
        <DialogContent>
          <TextField
            id="standard-multiline-static"
            label="Write your comments here"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            onChange={feedbackChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{margin: 1}}>
      <Feedbacks />
      </Box>
    </div>
  );
}
