import React, { useState } from 'react';
import NotesForm from './NotesForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Note = ({ todos, removeTodo, updateTodo }) => {
  //console.log(todos)
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    time: '',
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value,edit.time);
    setEdit({
      id: null,
      value: '',
      time: ''
    });
  };

  if (edit.id) {
    return <NotesForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo) => (
    <div
      className={'todo-row'}
      key={todo.id}
    >
      <div key={todo.id} >
        {todo.time}:  {todo.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text, time: todo.time })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Note;