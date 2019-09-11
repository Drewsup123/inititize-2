import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/logo.png';
// import {connect} from 'react-redux'

export default function TopNav(props) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{display:"flex", justifyContent : "space-between", alignItems : "center"}}>
                    <img src={logo} alt="logo" style={{width : "100px", height : "100%"}}/>
                    <h1> {props.selectedBoard.boardName ? props.selectedBoard.boardName : "No Board Selected"}</h1>
                    <h1>Version 0.1</h1>
                </Toolbar>
            </AppBar>
        </div>
    );
}