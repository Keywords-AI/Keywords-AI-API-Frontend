const initState = false;

const fileUplaodReducer = (state = initState, action) => {
    switch (action.type) {
        case "FILE_UPLOAD":
        return true;
        case "NOT_FILE_UPLOAD":
        return false;
        default:
        return state;
    }
};

export default fileUplaodReducer;