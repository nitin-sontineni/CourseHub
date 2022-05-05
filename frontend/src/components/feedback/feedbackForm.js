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
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


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
  const [feedbacks, setFeedbacks] = React.useState([]);
  
  const [mounted, setMounted] = useState(false);

  

  if(!mounted) {
  axios.post(
    "http://localhost:8080/student/lecturelink",
      {
        "courseId" : window.sessionStorage.getItem("student_course_id"),
        "lecNo" : window.sessionStorage.getItem("student_lecNo"),
        "studentId" : window.sessionStorage.getItem("student_id")
      }
    )
  .then(res => { 
    setFeedbacks(res["data"]["reviews"]);
  })
  .catch(err => {
    alert(err);
  })
  }

  React.useEffect(() =>{
    setMounted(true)
  },[])

  function handleDelete(key) {
    axios.post(
      "http://localhost:8080/student/review/delete",
      {
        "reviewId" : key,
      }
      )
    .then(res => { 
      axios.post(
        "http://localhost:8080/student/lecturelink",
          {
            "courseId" : window.sessionStorage.getItem("student_course_id"),
            "lecNo" : window.sessionStorage.getItem("student_lecNo"),
            "studentId" : window.sessionStorage.getItem("student_id")
          }
        )
      .then(res => { 
        setFeedbacks(res["data"]["reviews"])
      })
      .catch(err => {
        alert(err);
        })
        
      })
      .catch(err => {
        alert(err);
      })
    }
  const handleAdd = () => {
    console.log(value, feedback)

    axios.post(
      "http://localhost:8080/student/review/add",
        {
          "review" : 
          {
            "lecNo" : "1",
            "timeStamp" : window.sessionStorage.getItem("student_playedTime"),
            "rating" : value.toString(),
            "feedBack" : feedback,
            "studentId" : window.sessionStorage.getItem("student_id"),
            "courseId" : window.sessionStorage.getItem("student_course_id")
          }
      }
      )
    .then(res => { 
      axios.post(
        "http://localhost:8080/student/lecturelink",
          {
            "courseId" : window.sessionStorage.getItem("student_course_id"),
            "lecNo" : window.sessionStorage.getItem("student_lecNo"),
            "studentId" : window.sessionStorage.getItem("student_id")
          }
        )
      .then(res => { 
        setFeedbacks(res["data"]["reviews"]);
      })
      .catch(err => {
        alert(err);
      })
    })
    .catch(err => {
      alert(err);
    })
    setOpen(false);
  };

  var playedTime = window.sessionStorage.getItem("student_playedTime");
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
    <div className='notes-app'>
    <Box sx={{margin: 1}}>
    {feedbacks.length === 0 ? <h3 style = {{color:"white"}}> No Feedbacks</h3> :
    <Box sx = {{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      flexGrow: 10,
      width: 100
    }}
    >
    {((feedbacks)).map((elem) => (
    <Box sx={{margin : 1}}> 
    <Card sx={{ width: 650}} id={elem._id}>
      <CardContent>
        <Box sx={{flexDirection:'row'}}>
        <Box sx={{ display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          flexGrow: 10,
          width: 45,
          bgcolor:"black",
          margin: 0.4,
          paddingLeft : 1,
          paddingRight: 1,
          paddingTop: 0.85,
          borderRadius: 5
        }}>
        <Typography gutterBottom variant="h7" component="div" fontWeight='bold' color='white'>
          {elem.timeStamp}
        </Typography>
        </Box>
        <Box border={1}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          flexGrow: 10,
          width: 100,
          margin: 1
        }}
          >
          <Typography>
            <Rating
              name="hover-feedback"
              value={elem.rating}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
        </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          alignContent: 'left',
          flexGrow: 10,
          width: 550,
          margin: 1,
          justifyContent: "flex-start"
        }}>
        <Typography variant="h7" color="text.primary" style={{ display: "flex", justifyContent: "flex-start" }}>
          {elem.feedBack}
        </Typography>
        </Box>
        </Box>
        </Box>
      </CardContent> 
        <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
          <DeleteIcon onClick={() => handleDelete(elem._id)}/>
        </CardActions>   
      </Card>
      </Box>
      ))}
      </Box>
      }
      </Box>
      </div>
      </Box>
    </div>
  );
}
