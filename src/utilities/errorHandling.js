

export const handleSerializerErrors = (errors, callback = () => {}) => {
  // errors: {key: [error1, error2], key2: [error1, error2]}
  // callback: (error) => dispatch(dispatchNotification({title: "Error", message: error})
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
    throw new Error(responseJson.detail);
  } else {
    handleSerializerErrors(responseJson, callback); // Standard error from django
    throw new Error("Serializer error")
  }
};
