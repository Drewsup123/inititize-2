import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function TopNav() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <h1>Initize</h1>
                </Toolbar>
            </AppBar>
        </div>
    );
}