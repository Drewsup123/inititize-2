import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {createdBoard, changeSelected} from "../../redux/actions";
import {Link} from "react-router-dom";
import moment from 'moment';

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
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(false);
    const [subBoardName, setSubBoardName] = React.useState("");
    const [subBoardOpen, setSubBoardOpen] = React.useState(false);
    const [subBoards, setSubBoards] = React.useState([]);
    const [subBoardsCollapseOpen, setSubBoardsCollapseOpen] = React.useState(false);

    useEffect(() => {
        firebase.database().ref(`/boardData/${props.selectedBoard.id}`).once('value', snap => {
            if(snap.val()){
                setSubBoards(Object.values(snap.val()));
            }else{
                setSubBoards([])
            }
        })
    }, [props.selectedBoard]);

    useEffect(() => {
        firebase.database().ref(`/boardData/${props.selectedBoard.id}`).on('child_added', snap => {
            setSubBoards([...subBoards, snap.val()])
            console.log("Change handler executed")
        })
    }, [])

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
            firebase.database().ref('/users/' + props.user.uid + '/boards').push().set({
                id : key,
                boardImage : "",
                boardName : name
            }).then(res => {
                props.createdBoard({
                    id : key,
                    boardImage : "",
                    boardName : name
                })
            }).catch(err => {
                alert("Error");
                console.log(err);
            })
        })
        .catch(err => {
            alert("Error")
            console.log(err)
        })
        setOpen(false);
    }

    const showDate = date => `${moment(date).format("MMM Do YY")}`;

    const changeSelected = board => {
        props.changeSelected(board);
        props.history.push('/dashboard/' + board.id);
    }

    const addSubBoard = () => {
        if(subBoardName){
            firebase.database().ref(`/boardData/${props.selectedBoard.id}/${subBoardName}`).set({
                name : subBoardName,
                tasks : []
            }).then(() => {
                setSubBoardOpen(false);
            })
            .catch(err => {
                alert("There was an error creating the sub-board please try again.")
            })
        }else{
            alert("Please input a name for the board")
        }
    }

    if(props.location.pathname === '/' || props.location.pathname === "/authenticate"){
        return null;
    }
    const {user, boards} = props;
    return(
        <React.Fragment>
            <TopNav selectedBoard={props.selectedBoard} />
            <div className={classes.sidemenu}>
                <div className={classes.sidemenuBoards}>
                <Avatar onClick={() => setOpen(true)} style={{backgroundColor:"grey", cursor : "pointer"}} ><AddIcon /></Avatar>
                    {boards.map(board => 
                    <Tooltip key={board.id} title={board.boardName} placement="right">
                        <Avatar 
                            style={{cursor:"pointer"}} 
                            className={classes.avatar}
                            onClick={() => changeSelected(board)}
                        >
                            {board.boardName[0]}
                        </Avatar>
                    </Tooltip>
                    )}
                </div>
                <div className={classes.sidemenuContent}>
                    <Divider />
                    <Paper style={{display:"flex", justifyContent : "center", alignItems : "center", flexDirection : "column", background : "grey", padding : "2%", width : "80%"}}>
                        <div style={{display:"flex", justifyContent : "space-between", alignItems : "center", flexDirection : "row", width : "60%"}}>
                            <Avatar className={classes.avatar} src={props.user.profilePicture}/>
                            <h3>{props.user.username}</h3>
                        </div>
                        <p>Member since {showDate(props.user.dateJoined)}</p>
                        <Link to="/account-settings" style={{color : "black", textDecoration : "none"}}>
                        <div style={{display:"flex", justifyContent : "space-between", alignItems : "center", flexDirection : "row", width : "50%"}}>
                            <SettingsIcon />
                        </div>
                        </Link>
                    </Paper>

                    <Divider />
                    <List>
                        {
                            props.selectedBoard.id 
                            ?
                            <React.Fragment>
                            <ListItem button onClick={() => setSubBoardsCollapseOpen(!subBoardsCollapseOpen)}>
                                <ListItemIcon><AddIcon onClick={() => setSubBoardOpen(true)}/></ListItemIcon>
                                <ListItemText primary='Sub-Boards' />
                                {subBoardsCollapseOpen ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={subBoardsCollapseOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {subBoards.length 
                                        ? subBoards.map(board => 
                                            <Link style={{color : "black", textDecoration : "none"}} to={`/dashboard/${props.selectedBoard.id}/${board.name}`}>
                                                <ListItem button>
                                                    <ListItemText>{board.name}</ListItemText>
                                                </ListItem>
                                            </Link>
                                            ) 
                                        : "No Sub-Boards"}
                                </List>
                            </Collapse>
                            </React.Fragment>
                            :
                            <ListItem>
                                <ListItemText primary='Create A Board To Get Started' />
                            </ListItem>
                        }
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

            {/* sub board modal */}
            <Dialog open={subBoardOpen} onClose={() => setSubBoardOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create A Board</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Create a new sub-board to help separate tasks for your team.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Board Name"
                    type="text"
                    fullWidth
                    onChange={(e) => setSubBoardName(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setSubBoardOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => addSubBoard()} color="primary">
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
        boards : state.boards,
        selectedBoard : state.selectedBoard,
    }
}

export default connect(mapStateToProps, {createdBoard, changeSelected})(SideMenu)