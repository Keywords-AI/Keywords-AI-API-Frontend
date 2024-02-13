import { PayloadAction } from "@reduxjs/toolkit";
import {
  SET_CACHE_DATA,
  SET_CURRENT_TIME_RANGE,
} from "../actions/cachePageAction";
// let currDate = new Date();
type CachePageState = {
  // timeFrame: string;
  timeRange: string;
  error: any;
  loading: boolean;
  data: any[];
};

const initState: CachePageState = {
  // timeFrame: new Date(
  //   currDate.valueOf() - currDate.getTimezoneOffset() * 60 * 1000
  // )
  //   .toISOString()
  //   .split("T")[0],
  timeRange: "daily",
  error: null,
  loading: false,
  data: [],
};

// Define the reducer function
const cachePageReducer = (
  state: CachePageState = initState,
  action: PayloadAction<any>
): CachePageState => {
  switch (action.type) {
    case SET_CACHE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_CURRENT_TIME_RANGE:
      const currTimeRange = action.payload;
      // const offset = 0;
      // let updatedTimeFrame;
      // switch (currTimeRange) {
      //   case "yearly":
      //     updatedTimeFrame = new Date(currTime);
      //     updatedTimeFrame.setFullYear(updatedTimeFrame.getFullYear() + offset);
      //     break;
      //   case "monthly":
      //     updatedTimeFrame = new Date(currTime);
      //     updatedTimeFrame.setMonth(updatedTimeFrame.getMonth() + offset);
      //     break;
      //   case "weekly":
      //     updatedTimeFrame = new Date(currTime);
      //     updatedTimeFrame.setDate(updatedTimeFrame.getDate() + offset * 7);
      //     break;
      //   default:
      //     updatedTimeFrame = new Date(currTime);
      //     updatedTimeFrame.setDate(updatedTimeFrame.getDate() + offset);
      // }
      return {
        ...state,
        timeRange: currTimeRange,
        // timeFrame: new Date(
        //   updatedTimeFrame - updatedTimeFrame.getTimezoneOffset() * 60 * 1000
        // )
        //   .toISOString()
        //   .split("T")[0],
      };
    default:
      return state;
  }
};

export default cachePageReducer;
