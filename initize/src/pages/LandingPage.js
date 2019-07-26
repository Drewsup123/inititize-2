import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <Link to="/authenticate"><h1>signup</h1> </Link>
        </div>
    )
}