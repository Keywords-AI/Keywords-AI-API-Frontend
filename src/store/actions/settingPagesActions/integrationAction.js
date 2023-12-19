import apiConfig from "src/services/apiConfig";

export const GET_VENDORS = "GET_VENDORS";
export const GET_INTEGRATION = "GET_INTEGRATION";

export const getVendors = () => {
  return (dispatch) => {
    fetch(apiConfig.apiURL + "api/get-vendors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        dispatch({
          type: GET_VENDORS,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};
