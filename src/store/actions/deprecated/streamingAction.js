export const setStreaming = () => {
    return (dispatch) => {
        dispatch({ type: "STREAMING" })
    }
}

export const setNotStreaming = () => {
    return (dispatch) => {
        dispatch({ type: "NOT_STREAMING" })
    }
}