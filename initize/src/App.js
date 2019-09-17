import React from 'react';
import './App.css';
// Router Imports
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
// Page Imports
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AccountSettings from './pages/accountSettings';
import Error from './pages/error';
import BoardSettings from './pages/BoardSettings'
//Component Imports
import SideMenu from './components/global/SideMenu';
import ChatRoom from './components/Dashboard/chatRoom';

function App(props) {
  return (
    <div className="App">
      <Route path="/" render={() => <SideMenu {...props}/>} />
      <Route exact path="/" render={() => <LandingPage />} />
      {/* <Route render={() => <Error />} /> */}
      <Route path="/authenticate" render={() => <SignUp {...props}/>} />
      <div className="dashboard-content">
        <Route 
          exact
          path="/dashboard/:id/:subBoardId?" 
          render={(props) => 
            <Dashboard 
              key={props.match.params.subBoardId 
              ? props.match.params.subBoardId
              : props.match.params.id} 
              {...props}
            />} 
          />
          <Route path="/dashboard/:id/chatroom/:subBoardId?" 
            render={(props) => 
            <ChatRoom 
              key={props.match.params.subBoardId 
                ? props.match.params.subBoardId
                : props.match.params.id}
                {...props}
            />
          }
          />

        <Route 
          exact
          path="/board-settings/:id" 
          render={(props) => 
            <BoardSettings 
              key={props.match.params.subBoardId 
              ? props.match.params.subBoardId
              : props.match.params.id} 
              {...props}
            />} 
          />
        <Route path="/account-settings" render={props => <AccountSettings {...props}/>} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {loggedIn : state.loggedIn,}
}

export default connect(mapStateToProps)(withRouter(App));
