import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/logoplain.png';
import useStyles from '../../styles/AppBarStyles';
// import {connect} from 'react-redux'

export default function TopNav(props) {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <h1> {props.selectedBoard.boardName ? props.selectedBoard.boardName : "No Board Selected"}</h1>
                    <h1>Version 0.1</h1>
                </Toolbar>
            </AppBar>
        </div>
    );
}