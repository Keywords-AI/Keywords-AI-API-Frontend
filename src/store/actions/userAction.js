import { getCSRF } from "src/authentication/Authentication";
import { retrieveAccessToken } from "src/utilities/authorization";
import apiConfig from "src/services/apiConfig";
import { setOrg } from "./organizationAction";

export const SET_USER = 'SET_USER';

export const getUser = () => {
    return (dispatch) => {
      getCSRF();
      fetch(`${apiConfig.apiURL}auth/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retrieveAccessToken()}`,
        },
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            dispatch({ type: SET_USER, payload: data });
            dispatch(setOrg(data.organization));
          } else if (res.status === 401 && res.status == 403) {
            const data = await res.text();
            console.log(data);
            dispatch({ type: SET_USER, payload: {} });
          }
        })
        .catch((error) => console.log(error.message));
    };
};