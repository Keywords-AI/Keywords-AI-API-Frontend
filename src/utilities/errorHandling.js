

export const handleSerializerErrors = (errors, callback = () => {}) => {
  // errors: {key: [error1, error2], key2: [error1, error2]}
  Object.keys(errors).forEach((key) => {
    errors[key].forEach((error) => {
      const errorString = `${key}: ${error}`;
      callback(errorString);
    });
  });
};

export const handleApiResponseErrors = (
  responseJson, // Json object from the api
  callback = () => {} // Usaully (error) => dispatch(dispatchNotification({title: "Error", message: error}), error is a string
) => {
  if (responseJson.detail) {
    callback(responseJson.detail); // Regular error
  } else {
    handleSerializerErrors(responseJson, callback(error)); // Standard error from django
  }
};
