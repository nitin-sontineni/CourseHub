import React from 'react'
import ReactPlayer from 'react-player/youtube';
import Button from '@mui/material/Button';
import MenuAppBar from '../../header';
import './profLecture.css';
import ProfLecturePageTabs from "./profLecturepage_tabs.js";

export default function ProfLecture() {
    var url = window.sessionStorage.getItem("link")
    var lec_no = window.sessionStorage.getItem("lecNo");
    var lec_title = window.sessionStorage.getItem("title");
    return (
    <div>
      <MenuAppBar />
      <h2> {lec_no}.{lec_title}</h2>
      <div style={{paddingLeft : '15px', paddingBottom : '10px'}}>
        <Button variant="outlined" style={{textTransform : 'none'}} href="/profCourse">Back to Course Content</Button>
      </div>
      <div className='rowC' style = {{ paddingLeft : '15px'}}>
        <ReactPlayer url= {url} width = '1550px' height = '450px' />
        <ProfLecturePageTabs style = {{paddingLeft : '15px'}} />
      </div>
    </div>
  );
}