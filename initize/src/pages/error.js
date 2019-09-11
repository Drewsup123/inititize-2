import React from 'react';
import { Link } from 'react-router-dom';

export default function Error(){
    return(
        <div>
            <h1>Sorry there was an error processing your request</h1>
            <Link to='/authenticate'>
                <p>Go Back</p>
            </Link>
        </div>
    )
}