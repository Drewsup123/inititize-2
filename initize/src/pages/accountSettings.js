import React from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {signOut} from '../redux/actions';

class AccountSettings extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }

    signOut = () => {
        if(window.confirm("Are you sure you want to sign out?")){
            firebase.auth().signOut();
            this.props.signOut();
        }else{
            return;
        }
    }

    render(){
        return(
            <div>
                <h1>Account Settings</h1>
                <h2>Username : {this.props.user.username}</h2>
                <h2>Email : {this.props.user.email}</h2>
                <h2>Password : Change Password</h2>
                <h2>Profile Picture : Change Profile Picture</h2>
                <h2>Joined/Created Boards</h2>
                <button onClick={this.signOut}>SignOut</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps, {signOut})(AccountSettings);