import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase';
import {connect} from 'react-redux';

class ChatRoom extends React.Component{
    constructor(){
        super();
        this.state = {
            newMessage : '',
            newMessageTitle : "",
            messages : [],
            messagesLoading : false,
            messagesEmpty : false,
            searchTerm : "",
            searchResults : [],
            searchLoading : false,
        }
    }

    componentDidMount(){
        this.messageListener();
    }

    messageListener = () => {
        const loadedMessages = [];
        firebase.database().ref(`/boardData/${this.props.selectedBoard.id}/${this.props.match.params.subBoardId}`).child("messages").on("child_added", snap => {
            if(snap.val() === null){
                this.setState({messagesEmpty : true})
            }else{
                loadedMessages.push(snap.val());
                this.setState({messages : loadedMessages})
            }
        })
    }

    addMessage = e => {
        e.preventDefault();
        firebase.database().ref(`/boardData/${this.props.selectedBoard.id}/${this.props.match.params.subBoardId}`)
        .child("messages")
        .push().set({
            text : this.state.newMessage,
            title : this.state.newMessageTitle,
            user : {
                username : this.props.user.username,
                profilePicture : this.props.user.profilePicture,
                uid : this.props.user.uid,
            }
        })
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value});
    }

    render(){
        return(
            <div className="chatroom">
                <List style={{maxHeight : "85vh", overflowY:"scroll"}}>
                    {
                        this.state.messages.length 
                        ? 
                        this.state.messages.map(message => {
                            return(
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt={message.user.username} src={message.user.profilePicture} />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary={message.title}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {message.user.username}
                                        </Typography>
                                            - {message.text}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                            );
                        })
                        :
                        null
                    }
                </List>
                <div style={{position : "absolute", top : "90vh", left : "30%", right : "20%", width:"50%", maxHeight : "10vh"}}>
                    <form onSubmit={this.addMessage} autoComplete="off" style={{ width : "100%",border : "1px solid black", display : "flex", flexWrap:"wrap"}}>
                        <TextField
                            id="outlined-name"
                            label="Message Title (optional)"
                            name="newMessageTitle"
                            value={this.state.newMessageTitle}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            style={{width: "20%"}}
                        />
                        <TextField
                            id="outlined-name"
                            label="Message Text"
                            name="newMessage"
                            value={this.state.newMessage}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            style={{width: "70%"}}
                        />
                        <button style={{width : "10%"}} onClick={this.addMessage}>Send Message</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user : state.user,
        selectedBoard : state.selectedBoard,
        boards : state.boards
    }
}

export default connect(mapStateToProps)(ChatRoom);