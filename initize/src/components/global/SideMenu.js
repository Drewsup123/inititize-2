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
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import { array } from 'prop-types';

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

function SideMenu(props){
    const classes = useStyles();
    const [tempArr, setTempArr] = React.useState([1,2,3,4,5,6,7]);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(false);

    const createBoard = () => {
        const key = firebase.database().ref('/boards').push().key;
        firebase.database().ref('/boards/' + key).set({
            boardName : name,
            createdAt : Date.now(),
            id : key,
            owner : {
                username : props.user.username,
                profilePicture : props.user.profilePicture,
                email : props.user.email,
                uid : props.user.uid
            },
            users : [],
            plan : "FREE"
        }).then(res => {
            firebase.database().ref('/users/' + props.user.uid + '/boards').push().set(key).then(res => {
                alert("success")
            }).catch(err => {
                alert("Error");
                console.log(err)
            })
        })
        .catch(err => {
            alert("Error")
            console.log(err)
        })
        setOpen(false);
    }

    if(props.location.pathname === '/' || props.location.pathname === "/authenticate"){
        return null;
    }
    return(
        <React.Fragment>
            <TopNav />
            <div className={classes.sidemenu}>
                <div className={classes.sidemenuBoards}>
                <Avatar onClick={() => setOpen(true)} style={{backgroundColor:"grey", cursor : "pointer"}} ><AddIcon /></Avatar>
                    {tempArr.map(element => <Avatar className={classes.avatar}>{element}</Avatar>)}
                </div>
                <div className={classes.sidemenuContent}>
                    <Divider />
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
            {/* modal */}
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create A Board</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Create A new board for yourself or for your team.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Board Name"
                    type="text"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => createBoard()} color="primary">
                    Create
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        user : state.user,
    }
}

export default connect(mapStateToProps)(SideMenu)