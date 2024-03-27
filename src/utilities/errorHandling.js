export const handleSerializerErrors = (errors, callback) => {
  // errors: {key: [error1, error2], key2: [error1, error2]}
  // callback: (error) => dispatch(dispatchNotification({title: "Error", message: error})
  console.log("errors", errors);
  Object.keys(errors).forEach((key) => {
    if (Array.isArray(errors[key])) {
      errors[key].forEach((error) => {
        const errorString = `${key}: ${error}`;
        if (callback && typeof callback === "function") {
          callback(errorString);
          return;
        }
      });
    }
  });
};
