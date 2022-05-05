import * as React from 'react';
import { styled } from '@mui/system';
import MenuAppBar from '../../header';
import AddLecture from './addLecture';
import "./profCourse.css";
import axios from 'axios';
import {useState} from 'react';

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

export default function ProfCourse() {

  // ]
  const [rows, setRows] = useState([]);
  const [mounted, setMounted] = useState(false);
  // console.log(window.sessionStorage.getItem("course_id"))
  console.log(window.sessionStorage.getItem("course_id"))
  if(!mounted) {
  axios.post(
    "http://localhost:8080/professor/course/content",
      {
        "courseId" : window.sessionStorage.getItem("course_id"),
      }
    )
  .then(res => { 
    console.log(res)
    window.sessionStorage.setItem("num_lectures", res['data'].length)
    setRows(res["data"])
  })
  .catch(err => {
    alert(err);
  })
}

  React.useEffect(() =>{
    setMounted(true)
  },[])

  function getRowData(lecNo, date, title, link)
  {
    console.log(lecNo, date,title,link)
    window.sessionStorage.setItem("lecNo", lecNo);
    window.sessionStorage.setItem("date", date);
    window.sessionStorage.setItem("title", title);
    window.sessionStorage.setItem("link", link);

  }
  return (
    <div>
    <MenuAppBar />
    <h2> {window.sessionStorage.getItem("course_id")} - {window.sessionStorage.getItem("course_name")}</h2>
    <div style={{paddingLeft : '15px', paddingBottom : '10px'}}>
      <AddLecture />
    </div>
    {rows.length === 0 ? <h3> Add a lecture to continue </h3> :
    <Root sx={{ width: 1200, maxWidth: '100%', paddingLeft: "15px" }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Lec No</th>
            <th>Date of Lecture</th>
            <th>Title</th>
            <th>Recording Link</th>
            <th>Lecture Slides</th>
          </tr>
        </thead>
        <tbody>
          {(rows
          ).map((row) => (
            <tr key={row.lecNo} data-item={row} onClick={() => getRowData(row.lecNo,row.date,row.title,row.recordingLink)}>
              <td style={{ width: 20 }}>{row.lecNo}</td>
              <td style={{ width: 100 }} align="right">
                {row.date}
              </td>
              <td style={{ width: 100 }} align="right">
                {row.title}
              </td>
              <td style={{ width: 180 }} align="right">
                <a href= "/profLecture">
                <div>
                    {row.recordingLink}
                </div>
                </a>
              </td>
              <td style={{ width: 180 }} align="right">
              <a href= {row.slidesLink} target="_blank">
                <div>
                  Slides Link
                </div>
                </a>
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
