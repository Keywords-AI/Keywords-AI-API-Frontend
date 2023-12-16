import { SET_DATE, SET_USAGE_DATA, SET_FREE_CREDITS, SET_IS_FIRST, SET_IS_LAST } from "../actions";
const initialState = {
  date: new Date(),
  data: [
  ],
  freeCredits: null,
  isFirst: false,
  isLast: false,
};

export default function usagereducer(state = initialState, action) {
  switch (action.type) {
    case SET_USAGE_DATA:
      return { ...state, data: action.payload };
    case SET_DATE:
      return { ...state, date: action.payload };
    case SET_FREE_CREDITS:
      return { ...state, freeCredits: action.payload };
    case SET_IS_FIRST:
      return { ...state, isFirst: action.payload };
    case SET_IS_LAST:
      return { ...state, isLast: action.payload };
    default:
      return state;
  }
}
