// Importing actions here
import {} from './actions';

const initialState = {
    loggedIn : false,
    user : {},
}

export const reducer = (state = initialState, action) => {

    switch(action.type){
        
        default:
            return state;
    }
}