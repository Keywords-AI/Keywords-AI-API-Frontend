import { UPDATE_USER, SET_USER } from 'src/store/actions';
const initialState = {
    
};

export default  function userReducer(state=initialState, action) {
    switch(action.type) {
        case UPDATE_USER:
            return {...state, ...action.payload};
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
}