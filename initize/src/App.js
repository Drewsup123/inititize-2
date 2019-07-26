import React from 'react';
// Router Imports
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
// Page Imports
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <LandingPage />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="sign-up" render={() => <SignUp />} />
      <Route path="dashboard" render={() => <Dashboard />} />
    </div>
  );
}

export default App;
