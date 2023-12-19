const initState = {};


const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_MESSAGE':
            return state;
        case 'CREATE_MESSAGE_ERROR':
            return state;
        default:
            return state;
    }
};