import React from 'react';

class ChatRoom extends React.Component{
    constructor(){
        this.state = {
            newMessage : '',
            messages : [],
            messagesLoading : false,
            messagesEmpty : false,
            searchTerm : "",
            searchResults : [],
            searchLoading : false,
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