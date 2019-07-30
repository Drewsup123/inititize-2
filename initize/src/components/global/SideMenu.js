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

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    sidemenu : {
        height : "100vh",
        width : "12%",
        position : "fixed",
        backgroundColor : "rgba(0,0,0,0.4)",
        display : "flex",
        flexDirection : "row",
        paddingTop: "15px",
    },
    toolbar: {
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
    },
    avatar:{
        backgroundColor:"blue"
    },
    sidemenuBoards:{
        width : "15%",
        borderRight : "2px solid grey",
        height : "100%",
    },
    sidemenuContent:{
        width:"85%",
        display:"flex",
        flexDirection : "column",
        alignItems : "center"
    }
}));

export default function SideMenu(props){
    const classes = useStyles();
    const [tempArr, setTempArr] = React.useState([1,2,3,4,5,6,7])
    if(props.location.pathname === '/' || props.location.pathname === "/authenticate"){
        return null;
    }
    return(
        <React.Fragment>
            <TopNav />
            <div className={classes.sidemenu}>
                <div className={classes.sidemenuBoards}>
                    {tempArr.map(element => <Avatar className={classes.avatar}>{element}</Avatar>)}
                </div>
                <div className={classes.sidemenuContent}>
                    <Divider />
                    {/* <List>
                        {['Boards', 'Messages', 'Account Settings'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List> */}

                    <Paper style={{display:"flex", justifyContent : "center", alignItems : "center", flexDirection : "column", background : "grey", padding : "2%", width : "80%"}}>
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
            </div>
        </React.Fragment>
    );
}