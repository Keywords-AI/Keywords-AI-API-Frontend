import { getDateStr, textToLink } from "./stringProcessing";

export const digitToMonth = (digit, year) => {
  // let month = digit;
  // if (!digit) month = new Date().getMonth() + 1;
  // if (month === undefined) month = new Date().getMonth();
  // if (year === undefined) year = new Date().getFullYear();
  const now = new Date();
  let month = digit !== undefined ? digit : now.getMonth();
  year = year !== undefined ? year : now.getFullYear();
  const monthMap = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  return `${monthMap[month]} ${year}`;
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
    mod_prefix: key.prefix.slice(0,3) + "..."
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

export const generateChild = (page) => {
  let path = textToLink(page.title);
  if (page?.path) {
      path = page.path;
  }
  if (page?.default) {
      path = "";
  }
  return {
      default: page.default,
      title: page.title,
      path: path,
      element: page.page,
      page: page.page,
  };
}