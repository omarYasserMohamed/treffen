import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SignUpForm from "./components/signUpForm.component"
import LogInForm from "./components/logInForm.component"
import Profile from "./components/profile.component"
import VerifyEmail from "./components/verifyEmail.compnent"
import CreateMeeting from "./components/createMeeting.compnent"
import GoingToMeetings from "./components/goingToMeetings.component"
import CreatedMeetings from "./components/createdMeetings.component"
import WorldWideMeetings from "./components/meetingsWorlWide.component"
import CityMeetings from "./components/meetingInMyCity.component"
import EditMeeting from "./components/editMeeting.component"
import Logout from "./components/logout.component"
import EditUser from "./components/editUser.component"
import Comments from "./components/comments.component"
import ChangePassword from "./components/changePassword.component"
import Navbar1 from './components/navbar1.component'
import "bootstrap/dist/css/bootstrap.min.css"



function App() {
  return (
    <Router>
    <div>
      
      <Route path="/" exact component={LogInForm} />
      <Route path="/register" component={SignUpForm} />
      <Route path = '/login' component={LogInForm} />
      <Route path = '/profile/:id' component={Profile} />
      <Route path = '/verifyEmail/:username' component={VerifyEmail} />
      <Route path = "/createMeeting/:id" component={CreateMeeting} />
      <Route path = "/goingMeeting/:id" component={GoingToMeetings} />
      <Route path = "/createdMeeting/:id" component={CreatedMeetings} />
      <Route path = "/worldMeeting/:id" component={WorldWideMeetings} />
      <Route path = "/cityMeeting/:id" component={CityMeetings} />
      <Route path = "/logOut/:id" component={Logout} />
      <Route path = "/edit/:id/:meetingid" component={EditMeeting}/>
      <Route path = "/comments/:id/:meetingid" component={Comments}/>
      <Route path = "/editUser/" component={EditUser}/>
      <Route path = "/changePassword/:id" component={ChangePassword}/>
    </div>
    </Router>
  );
}

export default App;
