import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuAppBar from '../../header';
import AddCourse from './addCourse';
import img from '../../images/coding.jpg';
import { Box } from '@mui/system';
import axios from 'axios';
import "./home.css"

function createData(no, courseid, coursename) {
  return { no, courseid , coursename };
}
//const data = [
  // createData("1", "CS F111", "Computer Programming"),
  // createData("2", "CS F211", "Data Structures"),
//]

export default function ProfHomepage() {
  const [data, setData] = React.useState([]);
  const [mounted, setMounted] = useState(false);

  if(!mounted) {
  axios.post(
    "http://localhost:8080/student/login",
      {
        "password" : "12345",
        "email" : "Nitin@gmail.com",
      }
    )
  .then(res => { 
    console.log(res)
    setData(res["data"]["student"]["courses"])
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

  var name = window.sessionStorage.getItem("student_name");
  var courses = window.sessionStorage.getItem("student_courses");
  console.log(courses);
  return (
    <div>
    <MenuAppBar />
    <h2> Hi {name}, Your enrolled course(s) are</h2>
    <div style={{paddingLeft : '15px', paddingBottom : '10px'}}>
      <AddCourse />
    </div>
    {data.length === 0 ? <h3> Please enroll to any course to continue </h3> :
    <Box sx = {{
    margin: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 10 }}>
    {(data).map((elem) => (
    <Box sx={{ margin : 1}}>
    <Card sx={{ maxWidth: 345 }} >
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
          window.sessionStorage.setItem("student_course_id", elem.courseId) 
          window.sessionStorage.setItem("student_course_name", elem.courseName) 
          window.location.href = "/course"
        }}
        >
          Go to Course Content
        </Button>
      </CardActions>   
    </Card>
    </Box>
    ))}
    </Box>
  }
    </div>
  );
}