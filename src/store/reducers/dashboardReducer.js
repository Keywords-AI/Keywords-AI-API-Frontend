import {
    GET_DASHBOARD_DATA,
    SET_DASHBOARD_DATA,
} from "src/store/actions";
const initState = {
    data: [],
    summary: {},
};

export default function dashboardReducer(state = initState, action) {
    switch (action.type) {
        case SET_DASHBOARD_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}