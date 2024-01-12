import { dispatchErrorNotification } from "src/store/actions";

export const handleSerializerErrors = (errors) => {
  // errors: {key: [error1, error2], key2: [error1, error2]}
  // callback: (error) => dispatch(dispatchNotification({title: "Error", message: error})
  Object.keys(errors).forEach((key) => {
    errors[key].forEach((error) => {
      const errorString = `${key}: ${error}`;
      dispatchErrorNotification(errorString);
    });
  });
};

export const handleApiResponseErrors = (
  responseJson, // Json object from the api
) => {
  if (responseJson.detail) {
    dispatchErrorNotification(responseJson.detail); // Regular error
    throw new Error(responseJson.detail);
  } else {
    if (callback && typeof callback === "function") {
      handleSerializerErrors(responseJson); // Standard error from django
    }
    throw new Error("Serializer error");
  }
};
