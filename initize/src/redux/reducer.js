// Importing actions here
import {SIGN_UP, LOGIN, CREATED_BOARD, CHANGE_SELECTED, SIGNOUT, GETUSERS} from './actions';

const initialState = {
    loggedIn : false,
    user : {},
    boards : [],
    firstTimeUser : false,
    selectedBoard : {},
    selectedBoardUsers : [],
    selectedSubBoard : {},
}

export const reducer = (state = initialState, action) => {

    switch(action.type){
        case CHANGE_SELECTED:
            return {...state, selectedBoard : action.payload, selectedBoardUsers : []}
        case CREATED_BOARD:
            return {...state, boards : [...state.boards, action.payload]}
        case SIGN_UP:
            return {...state, user : action.payload, loggedIn : true, firstTimeUser : true};
        case LOGIN:
            return {...state, user : action.payload, loggedIn: true, boards : action.payload.boards ? Object.values(action.payload.boards) : []}
        case SIGNOUT:
            return {...state, user : {}, loggedIn : false, boards : [], selectedBoard : {}, selectedSubBoard : {}}
        case GETUSERS:
            return {...state, selectedBoardUsers : action.payload}
        default:
            return state;
    }
}