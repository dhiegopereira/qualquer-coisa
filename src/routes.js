import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavbarDashBoard from './components/NavbarDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ClassesByCourse from './pages/ClassesByCourse';
import CoursesDetails from './pages/CoursesDetails';
import CreateCourse from './pages/CreateCourse';
import Dashboard from './pages/Dashboard';
import Main from './pages/Main';
import MyCourses from './pages/MyCourses';
import MyStudents from './pages/MyStudents';
import Workers from './pages/Workers';
import PaymentRequest from './pages/PaymentRequested';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import RegisterCourse from './pages/RegisterCourse';
import SignIn from './pages/SignIn';
import SignUpSteps from './pages/SignUpSteps';
import UploadClasses from './pages/UploadClasses';
import WatchClasse from './pages/WatchClasse';
import { istAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      istAuthenticated() ? (
        <>
          <NavbarDashBoard {...props} />
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{ pathname: '/sign-in', state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUpSteps} />
      <Route path="/course-details" component={CoursesDetails} />
      <Route path="/cart" component={Cart} />
      <PrivateRoute path="/public-profile/:email" component={PublicProfile} />
      <PrivateRoute path="/workers" component={Workers} />
      <PrivateRoute path="/checkout" component={Checkout} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/create-course" component={CreateCourse} />
      <PrivateRoute path="/add-classes" component={UploadClasses} />
      <PrivateRoute path="/classes-by-course" component={ClassesByCourse} />
      <PrivateRoute path="/watch-classe" component={WatchClasse} />
      <PrivateRoute path="/register-course" component={RegisterCourse} />
      <PrivateRoute path="/list-my-courses" component={MyCourses} />
      <PrivateRoute path="/list-my-students" component={MyStudents} />
      <PrivateRoute path="/payment-requested" component={PaymentRequest} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
