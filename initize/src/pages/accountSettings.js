import React from 'react';
import {connect} from 'react-redux'

class AccountSettings extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <h1>Account Settings</h1>
                <h2>{this.props.user.username}</h2>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(AccountSettings);