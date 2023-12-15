import { getDateStr } from "./stringProcessing";
export const dightToMonth = (digit) => {
  const monthMap = {
    1: "January",
    2: "Febuary",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return monthMap[digit];
};

export const processKeyList = (keyList, actions=()=>{}) => {
  /*
  keyList: [{
    prefix: 1,
    name: "key1",
    created: "2020-01-01T00:00:00.000Z",
    last_used: "2020-01-01T00:00:00.000Z",
  }]
  actions: callback function (prefix) => { some actions with the prefix }
  */
  if (!keyList) return [];
  return keyList.map((key) => {
    return {...key, created: getDateStr(key.created_at), last_used: getDateStr(key.last_used), actions: actions(key)};
  });
};
