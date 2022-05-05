import React, { useState } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import "./feedback.css";

function Feedbacks() {
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


  return (
    <div className='notes-app'>
    <Box sx={{margin: 1}}>
    {feedbacks.length === 0 ? <h3 style = {{color:"white"}}> No Feedback</h3> :
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
  );

}
export default Feedbacks;