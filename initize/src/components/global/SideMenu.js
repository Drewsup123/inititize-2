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
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import {createdBoard, changeSelected, getUsers} from "../../redux/actions";
import {Link, Redirect} from "react-router-dom";
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
    },
    '@media(max-width : 1700px)' : {
        sidemenu : {
            width : "18%"
        }
    },
    '@media(max-width : 1200px)' : {
        sidemenu : {
            width : "25%"
        }
    },
}));

function SideMenu(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(false);
    const [subBoardName, setSubBoardName] = React.useState("");
    const [subBoardType, setSubBoardType] = React.useState("Board")
    const [subBoardOpen, setSubBoardOpen] = React.useState(false);
    const [subBoards, setSubBoards] = React.useState([]);
    const [subBoardsCollapseOpen, setSubBoardsCollapseOpen] = React.useState(false);
    const [inviteOpen, setInviteOpen] = React.useState(false);
    const [inviteCode, setInviteCode] = React.useState("");
    const [joinModalOpen, setJoinModalOpen] = React.useState(false);
    const [code, setCode] = React.useState("");

    useEffect(() => {
        newSubBoardListener()
    }, [])

    useEffect(() => {
        getSubBoards();
        getBoardUsers();
    }, [props.selectedBoard]);

    const createBoard = () => {
        const key = firebase.database().ref('/boards').push().key;
        const board = {
            boardName : name,
            createdAt : Date.now(),
            id : key,
            owner : {
                username : props.user.username,
                profilePicture : props.user.profilePicture,
                email : props.user.email,
                uid : props.user.uid
            },
        }
        firebase.database().ref('/boards/' + key).set(
            board
        ).then(res => {
            firebase.database().ref('/users/' + props.user.uid + '/boards').push().set(
                board
            ).then(res => {
                props.createdBoard(
                    board
                )
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

    const getSubBoards = () => {
        firebase.database().ref(`/boardData/${props.selectedBoard.id}`).once('value', snap => {
            if(snap.val()){
                setSubBoards(Object.values(snap.val()));
            }else{
                setSubBoards([])
            }
        })
    }

    const getBoardUsers = () => {
        firebase.database().ref(`/boards/${props.selectedBoard.id}`).child('users').once('value', snap => {
            if(snap.val()){
                props.getUsers(Object.values(snap.val()));
            }
        })
    }

    const showDate = date => `${moment(date).format("MMM Do YY")}`;

    const changeSelected = board => {
        props.changeSelected(board);
        props.history.push('/dashboard/' + board.id);
    }

    const addSubBoard = () => {
        if(subBoardName && subBoardType === "Board"){
            firebase.database().ref(`/boardData/${props.selectedBoard.id}/${subBoardName}`).set({
                name : subBoardName,
                type : "board",
                tasks : []
            }).then(() => {
                setSubBoardOpen(false);
                getSubBoards();
            })
            .catch(err => {
                alert("There was an error creating the sub-board please try again.")
            })
        }
        else if(subBoardName && subBoardType === "Chatroom"){
            firebase.database().ref(`/boardData/${props.selectedBoard.id}/${subBoardName}`).set({
                name : subBoardName,
                type : "chatroom",
                messages : []
            }).then(() => {
                setSubBoardOpen(false);
                getSubBoards();
            })
            .catch(err => {
                alert("There was an error creating the chatroom please try again.")
            })
        }
        else{
            alert(`Please input a name for the ${subBoardType.toLowerCase()}`)
        }
    }

    const handleRadioChange = e => {
        setSubBoardType(e.target.value)
    }
    
    const newSubBoardListener = () => {
        firebase.database().ref(`/boardData/${props.selectedBoard.id}`).on('child_added', snap => {
            console.log("newsubboard", snap);
            setSubBoards([...subBoards, snap.val()])
        })
    }
    
    const generateInviteCode = () => {
        const key = firebase.database().ref('/invites/').push().key;
        firebase.database().ref('/invites/').child(key).set({
            roomId : props.selectedBoard.id,
            createdAt : Date.now(),
            key : key,
        }).then(() => {
            setInviteCode(key)
        })
        .catch(err => {
            alert("There was an error generating the invite link");
            console.log(err);
        })
    }

    const joinRoom = () => {
        if(code){
            firebase.database().ref('/invites/').child(code).once('value', snap => {
                if(snap.val()){
                    const invite = snap.val();
                    firebase.database().ref('/boards/').child(invite.roomId).once('value', snap => {
                        const board = snap.val();
                        if(board){
                            console.log(board);
                            firebase.database().ref(`/users/${props.user.uid}/`).child('boards').push().set(board);
                            firebase.database().ref(`/boards/${invite.roomId}/users`).child(props.user.uid).push().set({
                                username : props.user.username,
                                profilePicture : props.user.profilePicture,
                                uid : props.user.uid
                            })
                            props.createdBoard(board)
                        }else{
                            alert("Board does not exist");
                        }
                    });
                }else{
                    alert("Invite code doesn't exist")
                }
            })
        }else{
            alert("Invite Code cannot be empty")
        }
        setJoinModalOpen(false);
    }

    if(props.location.pathname === '/' || props.location.pathname === "/authenticate"){
        return null;
    }
    
    if(props.location.pathname !== '/' || props.location.pathname !== "/authenticate"){
        if(props.loggedIn === false){
            return <Redirect to="/authenticate" />
        }
    }
    const {user, boards} = props;
    return(
        <React.Fragment>
            <TopNav selectedBoard={props.selectedBoard} />
            <div className={classes.sidemenu}>
                <div className={classes.sidemenuBoards}>
                <Avatar onClick={() => setOpen(true)} style={{backgroundColor:"grey", cursor : "pointer"}} ><AddIcon /></Avatar>
                <Avatar onClick={() => setJoinModalOpen(true)} style={{backgroundColor:"grey", cursor : "pointer"}}><VerticalAlignBottomIcon /></Avatar>
                    {boards.map(board => 
                    <Tooltip key={board.id} title={board.boardName} placement="right">
                        <Avatar 
                            key={board.id}
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

                    {
                    Object.keys(props.selectedBoard).length && props.selectedBoard.owner.uid === props.user.uid 
                    ?
                        <Button>
                            <SettingsIcon />
                            Board Settings
                        </Button>
                    :
                        null
                    }

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
                                            <Link 
                                                key={board.id}
                                                style={{color : "black", textDecoration : "none"}} 
                                                to={board.type === "board" ? `/dashboard/${props.selectedBoard.id}/${board.name}` : `/dashboard/${props.selectedBoard.id}/chatroom/${board.name}`}
                                            >
                                                <ListItem button>
                                                    <ListItemIcon>{board.type === "board" ? <AssignmentIcon/> : <ChatIcon />}</ListItemIcon>
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
                        <Divider />
                        <ListItem>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={`Members ${props.selectedBoard.users ? `(${props.selectedBoard.users.length + 1})` : ""}`} />
                            <ListItemIcon><AddIcon onClick={()=>setInviteOpen(true)}/></ListItemIcon>
                        </ListItem>
                        <List>
                            {
                                props.selectedBoard.owner && props.selectedBoardUsers 
                                ? 
                                <React.Fragment>
                                    <ListItem>
                                        <ListItemText primary={`(Owner) ${props.selectedBoard.owner.username}`} />
                                    </ListItem>
                                    {props.selectedBoardUsers.map(user => 
                                        <ListItem key={user.uid}>
                                            <ListItemIcon><ChatIcon /></ListItemIcon>
                                            <ListItemText primary={user.username} />
                                        </ListItem>
                                    )}
                                </React.Fragment>
                                :
                                <ListItem>
                                    <ListItemText primary="No Users Yet" />
                                </ListItem>
                            }
                        </List>
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

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup
                            aria-label="Type"
                            name="subBoardType"
                            value={subBoardType}
                            onChange={handleRadioChange}
                            style={{display : "flex", flexDirection : "row"}}
                        >
                            <FormControlLabel value="Board" control={<Radio />} label="Board" />
                            <FormControlLabel value="Chatroom" control={<Radio />} label="Chatroom" />
                        </RadioGroup>
                    </FormControl>
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

            {/* Invite Member modal */}
            <Dialog open={inviteOpen} onClose={() => setInviteOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Invite Members</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Invite other members to view and edit your boards. Codes last for 24 hours.
                    </DialogContentText>
                    <DialogContentText>
                        Code : {inviteCode}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    
                    <Button onClick={() => inviteOpen(false)} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={generateInviteCode} color="primary">
                        Generate Code
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Join Board Modal */}
            <Dialog open={joinModalOpen} onClose={() => setJoinModalOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Join A Board</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Copy and pase invite code below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Invite Code"
                    type="text"
                    fullWidth
                    onChange={(e) => setCode(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setJoinModalOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={joinRoom} color="primary">
                    Join
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
        loggedIn : state.loggedIn,
        selectedBoardUsers : state.selectedBoardUsers,
    }
}

export default connect(mapStateToProps, {createdBoard, changeSelected, getUsers})(SideMenu)