import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
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
            file : null,
            fileType : null,
            fileSelectOpen : false,
        }
    }

    componentDidMount(){
        this.messageListener();
        this.scrollToBottom();
    }

    componentDidUpdate(){
        this.scrollToBottom();
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
        if(this.state.newMessage){
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
            this.setState({newMessageTitle : "", newMessage : ""})
        }else{
            e.preventDefault();
            alert("You need to input a message");
        }
    }

    uploadFile = () => {
        const { file } = this.state;
        const metadata = { contentType : file.type };
        let uploadTask = firebase.storage()
        .ref(`/chatroomFiles/${this.props.selectedBoard.id}`)
        .child(`${file.lastModified}${file.name}`)
        .put(this.state.file, metadata);
        uploadTask.on('state_changed', 
            snapshot => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            error => {
                alert("There was an error uploading the image", error);
            }
            ,() => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log(downloadURL);
                    firebase.database()
                    .ref(`/boardData/${this.props.selectedBoard.id}/${this.props.match.params.subBoardId}`)
                    .child('messages')
                    .push().set({
                        file : downloadURL,
                        type : file.type,
                        name : file.name,
                        user : {
                            username : this.props.user.username,
                            profilePicture : this.props.user.profilePicture,
                            uid : this.props.user.uid,
                        }
                    })
                    this.setState({ file : null, fileSelectOpen : false });
                })
            }
        )
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value});
    }

    handleFileSelect = e => {
        console.log(e.target.files[0]);
        this.setState({ file : e.target.files[0] });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior : "smooth" })
    }

    handleFileSelectState = state => {
        this.setState({ fileSelectOpen : state });
    }

    render(){
        return(
            <React.Fragment>
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
                                        primary={message.file ? `${message.title ? message.title + "-" : ""} ${message.user.username}` : message.title}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {message.file ? "" : message.user.username}
                                                </Typography>
                                                -   {
                                                    message.text 
                                                    ? message.text 
                                                    : message.type === "image/jpeg" || message.type === "image/png" || message.type === "image/jpg" 
                                                        ? <img style={{width : "50%"}} src={message.file} alt="file" /> 
                                                        : <button>Download {message.name}</button>
                                                    }
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                );
                            })
                            :
                            null
                        }
                        <div ref={el => {this.messagesEnd = el; }}></div>
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
                            <Button color="primary" onClick={() => this.handleFileSelectState(true)}>Upload File</Button>
                        </form>
                    </div>
                </div>

                {/* file select modal */}
                <Dialog open={this.state.fileSelectOpen} onClose={() => this.handleFileSelectState(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Upload File</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Upload a file to chat. Supported files PNG, JPG, PDF. (More coming soon)
                        </DialogContentText>
                        <input onChange={this.handleFileSelect} type="file" />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.handleFileSelectState(false)} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={this.state.file === null} onClick={this.uploadFile} color="primary">
                        Upload To Channel
                    </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
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