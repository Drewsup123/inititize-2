import React from 'react';
import {Link} from 'react-router-dom';
import { Blob } from 'react-blob';
import styles from '../styles/LandingPageStyles';
import Logo from '../assets/logo.png'

export default function LandingPage(){
    return(
        <div style={styles.container}>
            {/* <Link to="/authenticate"><h1>signup</h1> </Link> */}
            <div style={styles.topHeader}>
                <Link to="/authenticate" style={styles.topHeaderBtn}><h3 style={styles.topHeaderBtn}>LOGIN/SIGNUP</h3> </Link>
            </div>
            <div style={styles.blobContainer}>
                <Blob size="50vh" style={styles.blob}
                >
                    <img src={Logo} alt="logo" style={styles.blobImg} />
                </Blob>
            </div>
        </div>
    )
}