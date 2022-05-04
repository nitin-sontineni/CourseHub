// import * as React from 'react';
// import Rating from '@mui/material/Rating';
// import Box from '@mui/material/Box';
// import StarIcon from '@mui/icons-material/Star';

// const labels = {
//   1: 'Poor',
//   2: 'Bad',
//   3: 'Ok',
//   4: 'Good',
//   5: 'Excellent',
// };

// function getLabelText(value) {
//   return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
// }

// export default function LectureRating() {
//   const [value, setValue] = React.useState();
//   const [hover, setHover] = React.useState(-1);
  
//   return (
//     <Box
//       sx={{
//         width: 200,
//         display: 'flex',
//         alignItems: 'center',
//         margin: 2
//       }}
//     >
//       <Rating
//         name="hover-feedback"
//         value={value}
//         getLabelText={getLabelText}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         onChangeActive={(event, newHover) => {
//           setHover(newHover);
//         }}
//         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//       />
//       {value !== null && (
//         <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
//       )}
//     </Box>
//   );
// }