export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const SET_IS_EDITING = 'SET_IS_EDITING';

export const errorMessage = (error) => ({
    type: ERROR_MESSAGE,
    payload: {
      role: "assistant",
      content: "Error: " + error.detail,
    },
});

// Is the custom prompt editing window open?
export const setIsEditing = (isEditing) => ({
    type: SET_IS_EDITING,
    payload: isEditing,
})