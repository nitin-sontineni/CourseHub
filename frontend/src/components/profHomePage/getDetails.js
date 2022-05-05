import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@material-ui/core/Button';
import MenuAppBar from '../../header';
import axios from 'axios';


const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  }
  `,
);

export default function GetDetails() {
  const [details, setDetails] = React.useState([]);
  const [mounted, setMounted] = useState(false);

  if(!mounted) {
  axios.post(
    "http://localhost:8080/professor/course/details",
      {
        "courseId" : window.sessionStorage.getItem("course_id"),
      }
    )
  .then(res => { 
    console.log(res)
    setDetails(res["data"])
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
    <h2> Student Details</h2>
    <div style={{paddingLeft : '15px', paddingBottom : '10px'}}>
        <Button variant="outlined" style={{textTransform : 'none'}} href="/profHomepage">Back to Homepage</Button>
    </div>
    {details.length === 0 ? <h3> No students enrolled in this course</h3> :
    <Root sx={{ width: 1200, maxWidth: '100%', paddingLeft: "15px" }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
          </tr>
        </thead>
        <tbody>
          {(details).map((row) => (
            <tr key={row.studentId}>
              <td style={{ width: 100 }} align="right">
                {row.studentName}
              </td>
              <td style={{ width: 100 }} align="right">
                {row.studentId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Root>
    }
    </div>
  );
}
