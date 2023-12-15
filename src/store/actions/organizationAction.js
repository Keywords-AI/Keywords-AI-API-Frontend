export const SET_ORG = "SET_ORG";
export const SET_ORG_NAME = "SET_ORG_NAME";

export const setOrg = (org) => {
  return (dispatch) => {
    dispatch({ type: SET_ORG, payload: org });
  };
};

export const setOrgName = (orgName) => {
  return (dispatch) => {
    dispatch({ type: SET_ORG_NAME, payload: orgName });
  };
};
