// Importing actions here
import {SIGN_UP, LOGIN, CREATED_BOARD, CHANGE_SELECTED} from './actions';

const initialState = {
    loggedIn : false,
    user : {},
    boards : [],
    firstTimeUser : false,
    selectedBoard : {},
    selectedSubBoard : {},
}

export const reducer = (state = initialState, action) => {

    switch(action.type){
        case CHANGE_SELECTED:
            return {...state, selectedBoard : action.payload}
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