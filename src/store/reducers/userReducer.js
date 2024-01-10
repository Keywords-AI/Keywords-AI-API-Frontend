import { UPDATE_USER, SET_USER } from "src/store/actions";
const initialState = {
  loading: true,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload };
    case SET_USER:
      return { loading: false, ...action.payload };
    default:
      return state;
  }
}
