import React, { useState, useReducer } from 'react';
import axios from "axios";
import "./notes.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CheckIcon from '@mui/icons-material/Check';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import Switch from '@mui/material/Switch';


function Notes() {
  const [todos, setTodos] = useState([]);
  const [mounted, setMounted] = useState(false);
  var playedTime = window.sessionStorage.getItem("student_playedTime");
  var placeholder = `Add Notes at ${playedTime}`
  var [input, setInput] = useState('');
  var [newInput, setNewInput] = useState('');
  //const [checked, setChecked] = React.useState(false);

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
      setTodos(res["data"]["notes"]["0"])
    })
    .catch(err => {
      alert(err);
    })
    }
  
    React.useEffect(() =>{
      setMounted(true)
    },[])

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const newInputChangeHandler = (event) => {
    setNewInput(event.target.value);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(
      "http://localhost:8080/student/note/add",
        {
          "note" : {
          "courseId" : window.sessionStorage.getItem("student_course_id"),
          "lecNo" : window.sessionStorage.getItem("student_lecNo"),
          "studentId" : window.sessionStorage.getItem("student_id"),
          "content" : input,
          "timeStamp" : playedTime,
          "public" : false,
          "edit" : false,
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
        setTodos(res["data"]["notes"]["0"])
        forceUpdate();
      })
      .catch(err => {
        alert(err);
      })
    })
    .catch(err => {
      alert(err);
    })
    setInput("");
  };

  function handleEdit(key) {
    for(var x in todos)
    {
      if(todos[x]._id === key)
      {
        todos[x].edit = true
        forceUpdate();
      }
    }
  }

  function handleDelete(key) {
    axios.post(
      "http://localhost:8080/student/note/delete",
        {
          "noteId" : key,
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
        setTodos(res["data"]["notes"]["0"])
      })
      .catch(err => {
        alert(err);
      })
      
    })
    .catch(err => {
      alert(err);
    })
  }

  function handleChecked(key,timeStamp,content,check)
  {
    axios.post(
      "http://localhost:8080/student/note/update",
      {
        "note" : {
        "courseId" : window.sessionStorage.getItem("student_course_id"),
        "lecNo" : window.sessionStorage.getItem("student_lecNo"),
        "studentId" : window.sessionStorage.getItem("student_id"),
        "content" : content,
        "timeStamp" : timeStamp,
        "public" : !check,
        "edit" : false,
        "noteId" : key
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
        setTodos(res["data"]["notes"]["0"])
        console.log(todos)
      })
      .catch(err => {
        alert(err);
      })
    })
    .catch(err => {
      alert(err);
    }) 
  }

  function handleUpdate(key,timeStamp) {
    if(newInput !==  "")
    {
      axios.post(
        "http://localhost:8080/student/note/update",
        {
          "note" : {
          "courseId" : window.sessionStorage.getItem("student_course_id"),
          "lecNo" : window.sessionStorage.getItem("student_lecNo"),
          "studentId" : window.sessionStorage.getItem("student_id"),
          "content" : newInput,
          "timeStamp" : timeStamp,
          "public" : false,
          "edit" : false,
          "noteId" : key
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
          setTodos(res["data"]["notes"]["0"])
        })
        .catch(err => {
          alert(err);
        })
      })
      .catch(err => {
        alert(err);
      })
    }
    else
    {
      for(var x in todos)
      {
        if(todos[x]._id === key)
        {
          todos[x].edit = false
          forceUpdate();
        }
      }

    }
  }

  return (
    <div>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, alignItems:"center" }}>
      <Grid container>
        <Grid item style={{ padding: "10px"}}>
            <TextField
              margin="normal"
              id="note"
              label= {placeholder}
              name="note"
              autoComplete="note"
              value={input}
              onChange={handleChange}
              style = {{width: 500}}
            />
          </Grid>
            <Grid item alignItems="stretch" style={{ display: "flex", padding: "10px" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Notes
            </Button>
            </Grid>
          </Grid>
      </Box>
    <div className='notes-app'>
    <Box>
    {todos.length === 0 ? <h3 style = {{color:"white"}}> No Notes Added</h3> :
    <Box sx = {{
      margin: 1,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'left',
      flexGrow: 10,
      width: 100
    }}
    >
    {(todos).map((elem) => (
    <Box sx={{margin : 1}}> 
    <Card sx={{ width: 670}} id={elem._id}>
      <CardContent>
        <Box sx={{
          margin: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexGrow: 10}}>
        <Box sx={{ 
          border: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'left',
          flexGrow: 10,
          maxWidth: 50,
          bgcolor:"black",
          margin: 0.5,
          paddingLeft : 1,
          paddingRight: 1,
          paddingTop: 0.85,
          borderRadius: 5
        }}>
        <Typography gutterBottom variant="h7" component="div" fontWeight='bold' color='white'>
          {elem.timeStamp}
        </Typography>
        </Box>
        { !elem.public ? 
          <Switch
          checked={false}
          onChange={() => handleChecked(elem._id,elem.timeStamp,elem.content,elem.pubic)}
          inputProps={{ 'aria-label': 'controlled' }}
          style={{ display: "flex", justifyContent: "flex-end" }}
          />
        :
        <Switch
          checked={true}
          onChange={() => handleChecked(elem._id,elem.timeStamp,elem.content,elem.public)}
          inputProps={{ 'aria-label': 'controlled' }}
          style={{ display: "flex", justifyContent: "flex-end" }}
        />
      }
        </Box>
        <Box>
        <Box sx={{
          border: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          alignContent: 'left',
          flexGrow: 10,
          width: 600,
          margin: 1,
          justifyContent: "flex-start",
          padding: "10px"}}>
        {!elem.edit ? (
        <Typography variant="h7" color="text.primary" style={{ display: "flex", justifyContent: "flex-start", alignContent: "flex-start" }}>
          {elem.content}
        </Typography> ): (
          <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          defaultValue= {elem.content}
          // defaultValue= "Well Explained"
          style={{ width: 600 }}
          onChange={newInputChangeHandler}
        /> )
        }
        </Box>
        </Box>
      </CardContent> 
      <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>

        { !elem.edit ? (<BorderColorIcon onClick={() => handleEdit(elem._id)}/>) :
        (
          <CheckIcon onClick={() => handleUpdate(elem._id,elem.timeStamp)} />
        )}

        <DeleteIcon onClick={() => handleDelete(elem._id)}/>
      </CardActions>   
    </Card>
    </Box>
    ))}
    </Box>
    }
    </Box>
    </div>
    </div>
  );

}
export default Notes;