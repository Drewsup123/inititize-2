import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const {message} = this.props;
        return(
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={message.user.username} src={message.user.profilePicture} />
            </ListItemAvatar>
            <ListItemText
                primary={message.file ? `${message.title ? message.title + "-" : ""} ${message.user.username}` : message.title}
                secondary={
                    <div style={{display : "flex", flexDirection : "column"}}>
                        <div>
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
                                : <a href={message.file} ><embed src={message.file} style={{width : "50%", height : "750px"}} type="application/pdf" /></a>
                                }
                        </div>
                        {message.comments && message.comments.length 
                            ?       
                            <Button variant="contained" style={{width : "200px"}}>
                                {message.comments.length} Reply.
                            </Button> 
                            : 
                            <Button variant="contained" style={{width : "200px"}}>
                                No Replies
                            </Button>
                        }
                    </div>
                }
            />
        </ListItem>
        )
    }
}

export default Message;
