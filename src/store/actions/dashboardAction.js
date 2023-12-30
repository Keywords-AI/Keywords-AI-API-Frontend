import { keywordsFetch } from "src/services/apiConfig";
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";

export const setDashboardData = (data) => {
  return {
    type: SET_DASHBOARD_DATA,
    payload: data,
  };
};

export const getDashboardData = () => {
  return (dispatch) => {
    keywordsFetch({
      path: "api/dashboard"
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(setDashboardData(data));
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};
