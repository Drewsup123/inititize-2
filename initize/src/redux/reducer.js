// Importing actions here
import {SIGN_UP, LOGIN} from './actions';

const initialState = {
    loggedIn : false,
    user : {},
    boards : [],
    firstTimeUser : false,
}

export const reducer = (state = initialState, action) => {

    switch(action.type){
        case SIGN_UP:
            return {...state, user : action.payload, loggedIn : true, firstTimeUser : true};
        case LOGIN:
            return {...state, user : action.payload, loggedIn: true, boards : action.payload.boards ? Object.values(action.payload.boards) : []}
        default:
            return state;
    }
}