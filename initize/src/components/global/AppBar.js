import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import {connect} from 'react-redux'

export default function TopNav(props) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <h1>Initize - </h1>
                    <h1> {props.selectedBoard.boardName ? props.selectedBoard.boardName : "No Board Selected"}</h1>
                </Toolbar>
            </AppBar>
        </div>
    );
}