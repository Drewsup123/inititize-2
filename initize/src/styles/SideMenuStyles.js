import { STARK, VOID, JEWEL, FUSHIA } from './variables';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    sidemenu : {
        height : "100vh",
        width : "12%",
        position : "fixed",
        backgroundColor : "rgba(0,0,0,0.4)",
        display : "flex",
        flexDirection : "row",
        paddingTop: "15px",
    },
    toolbar: {
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
    },
    avatar:{
        backgroundColor:"blue"
    },
    sidemenuBoards:{
        width : "15%",
        borderRight : "2px solid grey",
        height : "100%",
    },
    sidemenuContent:{
        width:"85%",
        display:"flex",
        flexDirection : "column",
        alignItems : "center"
    },
    '@media(max-width : 1700px)' : {
        sidemenu : {
            width : "18%"
        }
    },
    '@media(max-width : 1200px)' : {
        sidemenu : {
            width : "25%"
        }
    },
    '@media(max-width : 1000px)' : {
        sidemenu : {
            width : "35%",
        }
    },
    '@media(max-width : 750px)' : {
        sidemenu : {
            width : "40%",
        }
    }
});

export default useStyles;