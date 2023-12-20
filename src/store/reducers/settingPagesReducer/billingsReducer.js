import { SET_BILLINGS } from '../../actions/settingPagesActions/billingsAction';
const initState = [];


export default function billingsReducer(state = initState, action) {
    switch (action.type) {
        case SET_BILLINGS:
            return action.payload;
        default:
            return state;
    }
}