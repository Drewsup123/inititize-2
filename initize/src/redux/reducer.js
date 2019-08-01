// Importing actions here
import {SIGN_UP} from './actions';

const initialState = {
    loggedIn : false,
    user : {},
}

export const reducer = (state = initialState, action) => {

    switch(action.type){
        case SIGN_UP:
            return {...state, user : action.payload, loggedIn : true};
        default:
            return state;
    }
}