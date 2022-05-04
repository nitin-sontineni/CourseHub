import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function Feedbacks() {
  //const [todos, setTodos] = useState([]);
  var todos =
  [
    {
      "id"   : "1",
      "time" : "10.10",
      "rating" : 4,
      "comment" : "Explanation was good",
    },
    {
      "id": "2",
      "time" : "10.30",
      "rating" : 3,
      "comment" : "Video quality can be improved",
    }
  ]
  const [mounted, setMounted] = useState(false);
  var [input, setInput] = useState('');
  var [newInput, setNewInput] = useState('');
  const [edit,setEdit] = useState(false);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(input);
    setInput('');
  };

  if(!mounted) {
  axios.post(
    "http://localhost:8080/student/lecturelink",
      {
        "courseId" : window.sessionStorage.getItem("course_id"),
        "lecNo" : "1",
        "studentId" : window.sessionStorage.getItem("student_id")
      }
    )
  .then(res => { 
    console.log(res)
    //setTodos([res["data"]["notes"]["_id"],res["data"]["notes"]["content"],res["data"]["notes"]["timeStamp"]])
    //setData(res["data"]["professor"]["courses"])
  })
  .catch(err => {
    alert(err);
  })
  }

  React.useEffect(() =>{
    setMounted(true)
  },[])

    // axios.post(
    //   "http://localhost:8080/student/note/add",
    //     {
    //       "note": {
    //       "lecNo" : "1",
    //       "courseId" : window.sessionStorage.getItem("course_id"),
    //       "timeStamp" : todo.time,
    //       "content" : todo.text,
    //       "studentId" : window.sessionStorage.getItem("student_id"),
    //       "public" : false
    //       }
    //   }
    //   )
    // .then(res => { 
    //   console.log(res)
    // })
    // .catch(err => {
    //   alert(err);
    // })


  return (
    <div className='notes-app'>
    <Box sx={{margin: 1}}>
    {todos.length === 0 ? <h3> No Feedbacks</h3> :
    <Box sx = {{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      flexGrow: 10,
      width: 100
    }}
    >
    {(todos).map((elem) => (
    <Box sx={{margin : 1}}> 
    <Card sx={{ width: 650}} id={elem.id}>
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
          {elem.time}
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
          {elem.comment}
        </Typography>
        </Box>
        </Box>
        </Box>
      </CardContent> 
      <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
        <DeleteIcon />
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