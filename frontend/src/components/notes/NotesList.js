import React, { useState, useEffect, useRef } from 'react';
//import NotesForm from './NotesForm';
import Note from './Note';
import axios from "axios";
import "./notes.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CheckIcon from '@mui/icons-material/Check';

function Notes() {
  //const [todos, setTodos] = useState([]);
  var todos =
  [
    {
      "id"   : "1",
      "time" : "10.10",
      "note" : "Agile method is a way to manage a project by breaking it up into several phases",
      "edit" : false
    },
    {
      "id": "2",
      "time" : "10.30",
      "note" : "Exaplined UML diagram",
      "edit" : false
    }
  ]
  const [mounted, setMounted] = useState(false);
  var playedTime = window.sessionStorage.getItem("playedTime");
  var placeholder = `Add Notes at ${playedTime}`
  var [input, setInput] = useState('');
  var [newInput, setNewInput] = useState('');
  const [edit,setEdit] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const newInputChangeHandler = (event) => {
    setNewInput(event.target.value);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(input);
    setInput('');
  };

  function handleEdit(key) {
    //console.log(key);
    for(var x in todos)
    {
      if(todos[x].id === key)
      {
        todos[x].edit = !(todos[x].edit)
      }
    }
  }

  function handleUpdate(key) {
    for(var x in todos)
    {
      if(todos[x].id === key)
      {
        todos[x].edit = !(todos[x].edit)
      }
    }
  }

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
      <Box>
      <form onSubmit={handleSubmit} className='todo-form'>
      {edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder={placeholder}
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}      
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add Notes
          </button>
        </>
      )}
    </form>
      {/* <Note
        todos={todos}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      /> */}
    {todos.length === 0 ? <h3> No Notes</h3> :
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
    <Card sx={{ width: 650}} id={elem.id}>
      <CardContent>
        <Box sx={{flexDirection:'row'}}>
        <Box sx={{ display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          flexGrow: 10,
          width: 40,
          bgcolor:"black",
          margin: 1,
          paddingLeft : 1,
          paddingRight: 1,
          paddingTop: 0.85,
          borderRadius: 5
        }}>
        <Typography gutterBottom variant="h7" component="div" fontWeight='bold' color='white'>
          {elem.time}
        </Typography>
        </Box>
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
          {elem.note}
        </Typography> ): (
          <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          defaultValue= {elem.note}
          style={{ width: 200 }}
          onChange={newInputChangeHandler}
        /> )
        }
        </Box>
        </Box>
      </CardContent> 
      <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>

        { !elem.edit ? (<BorderColorIcon onClick={() => handleEdit(elem.id)}/>) :
        (
          <CheckIcon onClick={() => handleUpdate(elem.id)} />
        )}
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
export default Notes;