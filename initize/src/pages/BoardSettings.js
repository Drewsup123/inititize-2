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
            </div>
        )
    }
}