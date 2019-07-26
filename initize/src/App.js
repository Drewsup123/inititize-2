import React from 'react';
import logo from './logo.svg';
// Router Imports
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
// Page Imports

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => {<LandingPage />}} />
      <Route path="/login" render={() => {<Login />}} />
      <Route path="sign-up" render={() => {<SignUp />}} />
      <Route path="dashboard" render={() => {<Dashboard />}} />
    </div>
  );
}

export default App;
