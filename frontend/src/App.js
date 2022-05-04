import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import LogIn from './components/login/login.js';
import SignUp from './components/login/signup.js';
import MediaCard from "./components/home/home.js";
import Course from "./components/course/coursepage.js";
import Lecture from "./components/lecture/lecture.js";
import ProfHomePage from "./components/profHomePage/profHomePage.js";
import ProfCourse from "./components/profCourse/profCoursePage.js";
import ProfLecture from "./components/profLecture/profLecture.js";
import SelectRole from "./components/login/selectRole";
import ProfLogIn from "./components/profLogin/profLogin";
import ProfSignUp from "./components/profLogin/profSignup";
//import StudentDetails from "./components/profHomePage/details";
import GetDetails from "./components/profHomePage/getDetails";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <SelectRole />
          </Route>

          <Route path="/login" exact>
            <LogIn />
          </Route>
          <Route path="/profLogin" exact>
            <ProfLogIn />
          </Route>

          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/profSignup" exact>
            <ProfSignUp />
          </Route>

          <Route path="/profHomePage" exact>
            <ProfHomePage />
          </Route>
          <Route path="/homepage" exact>
            <MediaCard />
          </Route>

          <Route path="/studentDetails" exact>
            <GetDetails />
          </Route>

          <Route path="/profCourse" exact>
            <ProfCourse />
          </Route>
          <Route path="/course" exact>
            <Course />
          </Route>
          <Route path="/profLecture" exact>
            <ProfLecture />
          </Route>
          <Route path="/lecture" exact>
            <Lecture />
          </Route>
        </Switch>
    </Router>
  );
}
