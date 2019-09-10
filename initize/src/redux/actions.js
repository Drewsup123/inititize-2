// /* 
//   Action Types Go Here!
//   Be sure to export each action type so you can pull it into your reducer
// */
export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
export const CREATED_BOARD = "CREATED_BOARD";
export const CHANGE_SELECTED = "CHANGE_SELECTED";
export const SIGNOUT = "SIGNOUT";
export const GETUSERS = "GETUSERS"
// export const ADDBOARD = "ADD_BOARD";
// export const ADDBOARDID = "ADDBOARDID"

export const handleLogin = (payload) => dispatch => {
    dispatch({type: LOGIN, payload:payload})
}

export const handleSignup = (payload) => dispatch => {
    dispatch({type: SIGN_UP, payload:payload})
} 

export const createdBoard = (payload) => dispatch => {
    dispatch({type:CREATED_BOARD, payload:payload})
}

export const changeSelected = payload => dispatch => {
    dispatch({type:CHANGE_SELECTED, payload : payload})
}

export const signOut = () => dispatch => {
    dispatch({type : SIGNOUT})
}

export const getUsers = users => dispatch => {
    dispatch({ type: GETUSERS, payload : users})
}

// export const addBoardId = payload => dispatch => {
//   dispatch({type: ADDBOARDID, payload: payload})
// }