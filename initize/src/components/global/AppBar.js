import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/logoplain.png';
import useStyles from '../../styles/AppBarStyles';
import FeedbackIcon from '@material-ui/icons/FeedbackOutlined';
import Tooltip from '@material-ui/core/Tooltip';
// import {connect} from 'react-redux'

export default function TopNav(props) {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <h1> {props.selectedBoard.boardName ? props.selectedBoard.boardName : "No Board Selected"}</h1>
                    <div style={{display : "flex", flexDirection : "row"}}>
                        <h1>Version 0.1</h1>
                        <Tooltip title="Bug/Suggestion?" placement="bottom-start">
                            <a style={{color : "white", textDecoration : "none"}} href="https://forms.gle/itUkLrzc8MRHsJbx6" target="_blank"><FeedbackIcon /></a>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}