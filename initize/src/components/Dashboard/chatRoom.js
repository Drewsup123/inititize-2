import React from 'react';

class ChatRoom extends React.Component{
    constructor(){
        this.state = {
            newMessage : '',
            messages : [],
        }
    }

    render(){
        return(
            <div className="chatroom">

            </div>
        );
    }
}

export default ChatRoom;