// Importing actions here
import {SIGN_UP, LOGIN, CREATED_BOARD} from './actions';

const initialState = {
    loggedIn : false,
    user : {},
    boards : [],
    firstTimeUser : false,
    selectedBoard : {},
}

export const reducer = (state = initialState, action) => {

    switch(action.type){
        case CREATED_BOARD:
            return {...state, boards : [...state.boards, action.payload]}
        case SIGN_UP:
            return {...state, user : action.payload, loggedIn : true, firstTimeUser : true};
        case LOGIN:
            return {...state, user : action.payload, loggedIn: true, boards : action.payload.boards ? Object.values(action.payload.boards) : []}
        default:
            return state;
    }
}