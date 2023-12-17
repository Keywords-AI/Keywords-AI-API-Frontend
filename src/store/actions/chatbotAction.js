export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const errorMessage = (error) => ({
    type: ERROR_MESSAGE,
    payload: {
      role: "assistant",
      content: "Error: " + error.detail,
    },
  });