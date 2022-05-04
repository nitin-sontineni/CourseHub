import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import MenuAppBar from '../../header';
import img from '../../images/coding.jpg';
import "./profHomePage.css"
import AddCourse from './addCourse';
import axios from 'axios';

function createData(courseid, coursename) {
  return { courseid , coursename };
}

export default function ProfHomepage() {

  var name = window.sessionStorage.getItem("prof_name");
  const [data, setData] = React.useState([]);
  const [mounted, setMounted] = useState(false);

  if(!mounted) {
  axios.post(
    "http://localhost:8080/professor/login",
      {
        "password" : "12",
        "email" : "na@gmail.com",
      }
    )
  .then(res => { 
    console.log(res)
    setData(res["data"]["professor"]["courses"])
    // window.sessionStorage.setItem("student_name",res["data"]["student"]["name"]);
    // window.sessionStorage.setItem("student_id",res["data"]["student"]["studentId"]);
    // window.sessionStorage.setItem("student_courses",res["data"]["student"]["courses"]);
  })
  .catch(err => {
    alert(err);
  })
  }

  React.useEffect(() =>{
    setMounted(true)
  },[])


  return (
    <div>
    <MenuAppBar />
    <h2> Hi {name}, Your course(s) are</h2>
    <div style={{paddingLeft : '15px', paddingBottom : '10px'}}>
      <AddCourse />
    </div>
    {data.length === 0 ? <h3> Add new course to continue</h3> :
    <Box sx = {{
      margin: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 10,}}
    >
    {(data).map((elem) => (
    <Box sx={{margin : 1}}> 
    <Card sx={{ maxWidth: 345 }} style={{display: "inline-block", }}>
      <CardMedia
        style = {{ height: 200}}
        component="img"
        src={img}
        image= {img}
        alt="image"
      />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div">
          {elem.courseId}
        </Typography>
        <Typography variant="h7" color="text.primary">
          {elem.courseName}
        </Typography>
      </CardContent> 
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button size="small" variant="contained" style={{textTransform : 'none'}} 
          onClick={() => { 
            console.log(elem.courseid);
            window.sessionStorage.setItem("course_id", elem.courseId) 
            window.sessionStorage.setItem("course_name", elem.courseName) 
            window.location.href = "/profCourse"
          }}>
          Go to Course Content
        </Button>
        <Button size="small" variant="contained" style={{textTransform : 'none'}} href="/studentDetails">Get Details</Button>
      </CardActions>   
    </Card>
    </Box>
    ))}
    </Box>
    }
    </div>
  );
}