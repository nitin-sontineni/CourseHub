// // // import React, { useState, useCallback, useRef } from "react";
// // // import { Button, View, Alert } from "react-native";
// // // import YoutubePlayer from "react-native-youtube-iframe";
// // // import MenuAppBar from '../header';
// // // import "./home.css"

// // // export default function Lecture() {
// // //   const [playing, setPlaying] = useState(false);

// // //   const onStateChange = useCallback((state) => {
// // //     if (state === "ended") {
// // //       setPlaying(false);
// // //       Alert.alert("video has finished playing!");
// // //     }
// // //   }, []);

// // //   const togglePlaying = useCallback(() => {
// // //     setPlaying((prev) => !prev);
// // //   }, []);

// // //   return (
// // //     <div class="float-container">
// // //     <MenuAppBar />
// // //     <h2> Lec 1: Introduction</h2>
// // //     <View style={{ paddingLeft:"20px"}}>
// // //       <YoutubePlayer
// // //         height={560}
// // //         width={1000}
// // //         play={playing}
// // //         videoId={"vq_vZZZlCb0"}
// // //         onChangeState={onStateChange}
// // //       />
// // //       {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
// // //     </View>
// // //     </div>
// // //   );
// // // }

import React from 'react'
import ReactPlayer from 'react-player/youtube';
import { useState } from 'react';
import MenuAppBar from '../../header';
import Button from '@mui/material/Button';
import './lecture.css';
import LecturePageTabs from "./lecturepage_tabs.js";

export default function Lecture() {
    var url = window.sessionStorage.getItem("student_lec_link");
    var lec_no = window.sessionStorage.getItem("student_lecNo");
    var lec_title = window.sessionStorage.getItem("student_lec_title");
    const [played, setPlayed] = useState(0);

    var mins = Math.floor(played/60);
    var sec = (played - mins*60)/100;
    var current_time = (mins + sec).toFixed(2);
    window.sessionStorage.setItem("student_playedTime",current_time);
    return (
    <div>
      <MenuAppBar />
      <h2> {lec_no}.{lec_title}</h2>
      <div style={{paddingLeft : '15px', paddingBottom : '10px'}}>
        <Button variant="outlined" style={{textTransform : 'none'}} href="/course">Back to Course Content</Button>
      </div>
      <div className='rowC' style = {{ paddingLeft : '15px'}}>
      <ReactPlayer url= {url} width = '1550px' height = '450px' 
        controls
        onProgress={(progress) => {
          setPlayed(progress.playedSeconds);
        }}
      />
      <LecturePageTabs style = {{paddingLeft : '15px'}}>
      </LecturePageTabs>
      </div>
    </div>
  );
}