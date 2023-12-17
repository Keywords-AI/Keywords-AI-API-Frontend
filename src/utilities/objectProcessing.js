import { getDateStr } from "./stringProcessing";

export const digitToMonth = (digit) => {
  let month = digit;
  if (!digit) month = new Date().getMonth() + 1;
  const monthMap = {
    0: "January",
    1: "Febuary",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  return monthMap[month];
};

export function timeSkip(currentTime, deltaTime) {
  // Destructuring deltaTime object
  const { days = 0, months = 0, years = 0 } = deltaTime;

  // Creating a new date object based on the current time
  let newTime = new Date(currentTime);

  // Adding/subtracting days, months, and years
  newTime.setDate(newTime.getDate() + days);
  newTime.setMonth(newTime.getMonth() + months);
  newTime.setFullYear(newTime.getFullYear() + years);

  return newTime;
}

export const processKey = (key, actions = () => {}) => {
  return {
    ...key,
    created: getDateStr(key.created_at),
    last_used: getDateStr(key.last_used),
    actions: actions(key),
    prefix: key.prefix.slice(3) +'...'
  };
};

export const processKeyList = (keyList, actions = () => {}) => {
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
    return processKey(key, actions);
  });
};

export const processBillingList = (billingList, actions = () => {}) => {
  if (billingList && billingList?.length > 0) {
    return billingList.map((item) => {
      return {
        ...item,
        date: getDateStr(item.created, false, true),
        amount: `$${item.amount_paid / 100}`,
        payment_id: item.id,
        actions: actions(item),
      };
    });
  } else {
    return [];
  }
};
