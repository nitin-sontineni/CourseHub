// import React, { useState, useEffect, useRef } from 'react';

// function NotesForm(props) {

//   var playedTime = window.sessionStorage.getItem("playedTime");
//   var placeholder = `Add Notes at ${playedTime}`
//   var [input, setInput] = useState(props.edit ? props.edit.value : '');

//   const inputRef = useRef(null);

//   useEffect(() => {
//     inputRef.current.focus();
//   });

//   const handleChange = e => {
//     setInput(e.target.value);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     if(props.edit)
//     {
//       console.log(input)
//       console.log(props.edit)
//       props.onSubmit({
//         id: Math.floor(Math.random() * 10000),
//         text: input,
//         time: props.edit.time,
//       });
//       setInput('');
//     }
//     else
//     {
//       props.onSubmit({
//         id: Math.floor(Math.random() * 10000),
//         text: input,
//         time : playedTime
//       });
//       setInput('');
//     }
//   };

//   const handleEdit = e => {
//     e.preventDefault();
//   };

//   return (
//     <form onSubmit={handleSubmit} className='todo-form'>
//       {props.edit ? (
//         <>
//           <input
//             placeholder='Update your item'
//             value={input}
//             onChange={handleChange}
//             name='text'
//             ref={inputRef}
//             className='todo-input edit'
//           />
//           <button onClick={handleSubmit} className='todo-button edit'>
//             Update
//           </button>
//         </>
//       ) : (
//         <>
//           <input
//             placeholder={placeholder}
//             value={input}
//             onChange={handleChange}
//             name='text'
//             className='todo-input'
//             ref={inputRef}      
//           />
//           <button onClick={handleSubmit} className='todo-button'>
//             Add Notes
//           </button>
//         </>
//       )}
//     </form>
//   );
// }

// export default NotesForm;