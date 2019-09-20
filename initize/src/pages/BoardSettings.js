import React from 'react';

export default class BoardSettings extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        return(
            <div>
                <h1>Board Settings</h1>
                <h2>{this.props.match.params.id}</h2>
                <h3>This is still in development will have complete history log, user options such as promote/remove, upgrade board, and delete board</h3>
            </div>
        )
    }
}