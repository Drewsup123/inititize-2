import {STARK, VOID, JEWEL, FUSHIA} from './variables';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    appBar : {
        backgroundColor : JEWEL,
    },
    toolbar : {
        display:"flex", 
        justifyContent : "space-between", 
        alignItems : "center",
    },
    logo : {
        width : "100px", 
        height : "100%",
    },
});

export default useStyles;