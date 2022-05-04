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
    var url ='https://www.youtube.com/watch?v=WjwEh15M5Rw&t=401s';
    var lec_no = '1';
    var lec_title = 'Introduction';
    const [played, setPlayed] = useState(0);

    var mins = Math.floor(played/60);
    var sec = (played - mins*60)/100;
    var current_time = (mins + sec).toFixed(2);
    window.sessionStorage.setItem("playedTime",current_time);
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

// import React, { useState, useRef, useEffect } from "react";

// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import ReactPlayer from "react-player";
// import { makeStyles, withStyles } from "@mui/styles";

// import Slider from "@mui/material/Slider";
// import Tooltip from "@mui/material/Tooltip";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import VolumeUp from "@mui/icons-material/VolumeUp";
// import VolumeDown from "@mui/icons-material/VolumeDown";
// import VolumeMute from "@mui/icons-material/VolumeOff";
// import FullScreen from "@mui/icons-material/Fullscreen";
// import Popover from "@mui/material/Popover";
// import screenful from "screenfull";
// import Controls from "./controls.js";

// const useStyles = makeStyles({
//   playerWrapper: {
//     width: "100%",

//     position: "relative",
//     // "&:hover": {
//     //   "& $controlsWrapper": {
//     //     visibility: "visible",
//     //   },
//     // },
//   },

//   controlsWrapper: {
//     visibility: "hidden",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "rgba(0,0,0,0.4)",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   topControls: {
//     display: "flex",
//     justifyContent: "flex-end",
//     // padding: theme.spacing(2),
//   },
//   middleControls: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   bottomWrapper: {
//     display: "flex",
//     flexDirection: "column",

//     // background: "rgba(0,0,0,0.6)",
//     // height: 60,
//     // padding: theme.spacing(2),
//   },

//   bottomControls: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     // height:40,
//   },

//   // button: {
//   //   margin: theme.spacing(1),
//   // },
//   controlIcons: {
//     color: "#777",

//     fontSize: 50,
//     transform: "scale(0.9)",
//     "&:hover": {
//       color: "#fff",
//       transform: "scale(1)",
//     },
//   },

//   bottomIcons: {
//     color: "#999",
//     "&:hover": {
//       color: "#fff",
//     },
//   },

//   volumeSlider: {
//     width: 100,
//   },
// })

// const PrettoSlider = withStyles({
//   root: {
//     height: 8,
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: "#fff",
//     border: "2px solid currentColor",
//     marginTop: -8,
//     marginLeft: -12,
//     "&:focus, &:hover, &$active": {
//       boxShadow: "inherit",
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: "calc(-50% + 4px)",
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

// // function valuelabelcomponent(props) {
// //   const { children, open, value } = props;

// //   return (
// //     <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
// //       {children}
// //     </Tooltip>
// //   );
// // }

// const format = (seconds) => {
//   if (isNaN(seconds)) {
//     return `00:00`;
//   }
//   const date = new Date(seconds * 1000);
//   const hh = date.getUTCHours();
//   const mm = date.getUTCMinutes();
//   const ss = date.getUTCSeconds().toString().padStart(2, "0");
//   if (hh) {
//     return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
//   }
//   return `${mm}:${ss}`;
// };

// let count = 0;

// function Lecture() {
//   const classes = useStyles();
//   const [showControls, setShowControls] = useState(false);
//   // const [count, setCount] = useState(0);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
//   const [state, setState] = useState({
//     pip: false,
//     playing: true,
//     controls: false,
//     light: false,

//     muted: true,
//     played: 0,
//     duration: 0,
//     playbackRate: 1.0,
//     volume: 1,
//     loop: false,
//     seeking: false,
//   });

//   const playerRef = useRef(null);
//   const playerContainerRef = useRef(null);
//   const controlsRef = useRef(null);
//   const canvasRef = useRef(null);
//   const {
//     playing,
//     controls,
//     light,

//     muted,
//     loop,
//     playbackRate,
//     pip,
//     played,
//     seeking,
//     volume,
//   } = state;

//   const handlePlayPause = () => {
//     setState({ ...state, playing: !state.playing });
//   };

//   const handleRewind = () => {
//     playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
//   };

//   const handleFastForward = () => {
//     playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
//   };

//   const handleProgress = (changeState) => {
//     if (count > 3) {
//       controlsRef.current.style.visibility = "hidden";
//       count = 0;
//     }
//     if (controlsRef.current.style.visibility == "visible") {
//       count += 1;
//     }
//     if (!state.seeking) {
//       setState({ ...state, ...changeState });
//     }
//   };

//   const handleSeekChange = (e, newValue) => {
//     console.log({ newValue });
//     setState({ ...state, played: parseFloat(newValue / 100) });
//   };

//   const handleSeekMouseDown = (e) => {
//     setState({ ...state, seeking: true });
//   };

//   const handleSeekMouseUp = (e, newValue) => {
//     console.log({ value: e.target });
//     setState({ ...state, seeking: false });
//     // console.log(sliderRef.current.value)
//     playerRef.current.seekTo(newValue / 100, "fraction");
//   };

//   const handleDuration = (duration) => {
//     setState({ ...state, duration });
//   };

//   const handleVolumeSeekDown = (e, newValue) => {
//     setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
//   };
//   const handleVolumeChange = (e, newValue) => {
//     // console.log(newValue);
//     setState({
//       ...state,
//       volume: parseFloat(newValue / 100),
//       muted: newValue === 0 ? true : false,
//     });
//   };

//   const toggleFullScreen = () => {
//     screenful.toggle(playerContainerRef.current);
//   };

//   const handleMouseMove = () => {
//     console.log("mousemove");
//     controlsRef.current.style.visibility = "visible";
//     count = 0;
//   };

//   const hanldeMouseLeave = () => {
//     controlsRef.current.style.visibility = "hidden";
//     count = 0;
//   };

//   const handleDisplayFormat = () => {
//     setTimeDisplayFormat(
//       timeDisplayFormat == "normal" ? "remaining" : "normal"
//     );
//   };

//   const handlePlaybackRate = (rate) => {
//     setState({ ...state, playbackRate: rate });
//   };

//   const hanldeMute = () => {
//     setState({ ...state, muted: !state.muted });
//   };

//   const currentTime =
//     playerRef && playerRef.current
//       ? playerRef.current.getCurrentTime()
//       : "00:00";

//   const duration =
//     playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
//   const elapsedTime =
//     timeDisplayFormat == "normal"
//       ? format(currentTime)
//       : `-${format(duration - currentTime)}`;

//   const totalDuration = format(duration);

//   return (
//     <>
//       <AppBar position="fixed">
//         <Toolbar>
//           <Typography>React Video Player</Typography>
//         </Toolbar>
//       </AppBar>
//       <Toolbar />
//       <Container maxWidth="md">
//         <div
//           onMouseMove={handleMouseMove}
//           onMouseLeave={hanldeMouseLeave}
//           ref={playerContainerRef}
//           className={classes.playerWrapper}
//         >
//           <ReactPlayer
//             ref={playerRef}
//             width="100%"
//             height="100%"
//             url="https://www.youtube.com/watch?v=nvyItYNf01U"
//             pip={pip}
//             playing={playing}
//             controls={false}
//             light={light}
//             loop={loop}
//             playbackRate={playbackRate}
//             volume={volume}
//             muted={muted}
//             onProgress={handleProgress}
//             height={800}
//             config={{
//               file: {
//                 attributes: {
//                   crossorigin: "anonymous",
//                 },
//               },
//             }}
//           />

//           <Controls
//             ref={controlsRef}
//             onSeek={handleSeekChange}
//             onSeekMouseDown={handleSeekMouseDown}
//             onSeekMouseUp={handleSeekMouseUp}
//             onDuration={handleDuration}
//             onRewind={handleRewind}
//             onPlayPause={handlePlayPause}
//             onFastForward={handleFastForward}
//             playing={playing}
//             played={played}
//             elapsedTime={elapsedTime}
//             totalDuration={totalDuration}
//             onMute={hanldeMute}
//             muted={muted}
//             onVolumeChange={handleVolumeChange}
//             onVolumeSeekDown={handleVolumeSeekDown}
//             onChangeDispayFormat={handleDisplayFormat}
//             playbackRate={playbackRate}
//             onPlaybackRateChange={handlePlaybackRate}
//             onToggleFullScreen={toggleFullScreen}
//             volume={volume}
//           />
//         </div>
//         <canvas ref={canvasRef} />
//       </Container>
//     </>
//   );
// }

// export default Lecture;
