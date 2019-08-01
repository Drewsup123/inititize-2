import React from 'react';
import './App.css';
// Router Imports
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
// Page Imports
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
//Component Imports
import SideMenu from './components/global/SideMenu';

function App(props) {
  return (
    <div className="App">
      <Route path="/" render={() => <SideMenu {...props}/>} />
      <Route exact path="/" render={() => <LandingPage />} />
      <Route path="/authenticate" render={() => <SignUp {...props}/>} />
      <div className="dashboard-content">
        <Route path="/dashboard" render={() => <Dashboard />} />
      </div>
    </div>
  );
}

export default withRouter(App);
