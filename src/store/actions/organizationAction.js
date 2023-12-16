export const SET_ORG = "SET_ORG";
export const SET_ORG_NAME = "SET_ORG_NAME";
export const ADD_MEMBER = "ADD_MEMBER";

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

export const addMember = (member) => {
  return (dispatch) => {
    dispatch({ type: ADD_MEMBER, payload: member });
  };
};
