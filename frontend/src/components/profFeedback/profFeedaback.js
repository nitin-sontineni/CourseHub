import * as React from 'react';
import { useState } from "react";
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ViewFeedback() {
  const [reviews, setReviews] = useState([]);
  
  const [mounted, setMounted] = useState(false);  

  if(!mounted) {
  axios.post(
    "http://localhost:8080/professor/lecturelink",
      {
        "courseId" : window.sessionStorage.getItem("course_id"),
        "lecNo" : window.sessionStorage.getItem("lecNo"),
      }
    )
  .then(res => { 
    console.log(res["data"])
    setReviews(res["data"]);
    console.log(reviews);
  })
  .catch(err => {
    alert(err);
  })
  }

  React.useEffect(() =>{
    setMounted(true)
  },[])


  return (
    <div className='notes-app'>
    <Box sx={{margin: 1}}>
    {reviews.length === 0 ? <h3 style={{ color: "white"}}> No Feedbacks</h3> :
    <Box sx = {{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      flexGrow: 10,
      width: 100
    }}
    >
    {((reviews)).map((elem) => (
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
      </Card>
      </Box>
      ))}
      </Box>
      }
      </Box>
    </div>
  );
}
