import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SettingsIcon from '@material-ui/icons/Settings';
import MailIcon from '@material-ui/icons/Mail';
import TopNav from './AppBar';
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    sidemenu : {
        height : "100vh",
        width : "12%",
        position : "fixed",
        backgroundColor : "rgba(0,0,0,0.4)",
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: {
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
    },
    avatar:{
        backgroundColor:"blue"
    }
}));

export default function SideMenu(props){
    const classes = useStyles();
    if(props.location.pathname === '/' || props.location.pathname === "/authenticate"){
        return null;
    }
    return(
        <React.Fragment>
            <TopNav />
            <div className={classes.sidemenu}>
                <Divider />
                {/* <List>
                    {['Boards', 'Messages', 'Account Settings'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List> */}

                <Paper style={{display:"flex", justifyContent : "center", alignItems : "center", flexDirection : "column", background : "grey", padding : "5%"}}>
                    <div style={{display:"flex", justifyContent : "space-between", alignItems : "center", flexDirection : "row", width : "60%"}}>
                        <Avatar className={classes.avatar}>DJ</Avatar>
                        <h3>Drew Johnson</h3>
                    </div>

                    <div style={{display:"flex", justifyContent : "space-between", alignItems : "center", flexDirection : "row", width : "50%"}}>
                        <SettingsIcon />
                        <p>Account Settings</p>
                    </div>
                </Paper>

                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Boards' />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary='Messages' />
                    </ListItem>
                </List>
            </div>
        </React.Fragment>
    );
}