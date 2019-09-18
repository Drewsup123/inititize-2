import {STARK, VOID, JEWEL} from './variables';
const styles = {
    container : {
        boxSizing : "border-box",
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        backgroundColor : JEWEL,
        padding : "20px",
        height : "100vh"
    },
    topHeader : {
        display : "flex",
        width : "100%",
        justifyContent : "flex-end",
    },
    topHeaderBtn : {
        color : STARK,
        textDecoration : "none",
        '&:hover' : {
            color : "black",
            backgroundColor : "white",
        }
    },
    blobContainer : {
        display : "flex",
        height : "100%",
        alignItems : "center",
    },
    blob : {
        zIndex: 100,
        backgroundColor: VOID,
        color: 'blue',
        fontSize: '50vh',
        width : "25vw",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        margin: "20px",
    },
    blobImg : {
        height : "20vh",
        width : "100%",
    }
}

export default styles;