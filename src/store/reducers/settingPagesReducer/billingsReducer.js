import { 
    SET_BILLINGS,
    SET_CURRENT_SUBSCRIPTION,
 } from 'src/store/actions';
const initState = {
    billings: [],
    currentSubscription: {},
};


export default function billingsReducer(state = initState, action) {
    switch (action.type) {
        case SET_BILLINGS:
            return {...state, billings:action.payload};
        case SET_CURRENT_SUBSCRIPTION:
            return {...state, currentSubscription:action.payload};
        default:
            return state;
    }
}