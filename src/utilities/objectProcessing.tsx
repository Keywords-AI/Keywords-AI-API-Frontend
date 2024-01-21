import { AnyNode } from "postcss";
import { getDateStr, textToLink, capitalize } from "./stringProcessing";
import { Page } from "src/types"
import React, { ReactElement } from "react";
import { Billing, StripeBillingItem, Subscription, StripeSubscription } from "src/types";

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

export function formatDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = yyyy + "-" + mm + "-" + dd;
  return date;
}

export function timeSkip(currentTime: string, deltaTime: any) {
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

export const processKey = (
  key: any,
  actions = (key: any): ReactElement => { return <></> },
  renderStatus = (status: any): ReactElement => { return <></> }
) => {
  const today = new Date();
  const expireDate = isNaN(new Date(key.expire_date).getTime())
    ? "Infinite"
    : new Date(key.expire_date);
  // const expireDate = new Date(new Date().setDate(new Date().getDate() - 1));  // for testing expired key

  let status = "Active";
  if (expireDate === "Infinite") {
    status = "Active";
  } else if (expireDate < today) {
    status = "Expired";
  }
  return {
    ...key,
    created: getDateStr(key.created),
    last_used: getDateStr(key.last_used),
    Status: renderStatus(status),
    actions: actions(key),
    mod_prefix: key.prefix.slice(0, 3) + "...",
  };
};

export const processKeyList = (
  keyList: any[],
  actions = (key: any): ReactElement => { return <></> },
  renderStatus = (status: any): ReactElement => { return <></> }
) => {
  /*
  keyList: [{
    prefix: 1,
    name: "key1",
    created: "2020-01-01T00:00:00.000Z",
    last_used: "2020-01-01T00:00:00.000Z",
  }]
  actions: callback function (prefix) => { some actions with the prefix }
  */
  if (!keyList || !keyList.length) return [];
  return keyList.map((key) => {
    return processKey(key, actions, renderStatus);
  });
};

export const processSubscription = (subscription: StripeSubscription): Subscription => {
  return {
    name: capitalize(subscription?.items.data[0].plan.nickname ?? "none"),
    renewal_date: getDateStr(subscription?.current_period_end, false, true),
    amount: `$${(subscription?.items.data[0].plan.amount ?? 0) / 100}`,
    interval: capitalize(subscription?.items.data[0].plan.interval ?? ""),
  };
}

export const processBillingItem = (billingItem: StripeBillingItem, actions = (item: any): React.ReactNode => { return <></> }): Billing => {
  return {
    name: billingItem?.customer_name,
    email: billingItem?.customer_email,
    date: getDateStr(billingItem?.created, false, true),
    amount: `$${(billingItem?.amount_paid ?? 0) / 100}`,
    payment_id: billingItem?.id,
    actions: actions(billingItem),
  } as Billing;
};

export const processBillingList = (billingList: StripeBillingItem[], actions = (item: any): React.ReactNode => { return <></> }): Billing[] => {
  if (billingList && billingList?.length > 0) {
    return billingList.map((item): Billing => {
      return processBillingItem(item, actions);
    });
  } else {
    return [];
  }
};

export const generateChild = (page: any): Page => {
  let path = textToLink(page.title);
  if (page?.path) {
    path = page.path;
  }
  if (page?.default) {
    path = "";
  }
  return {
    default: page.default,
    forKeywordsAdmin: page.forKeywordsAdmin,
    forOrgAdmin: page.forOrgAdmin ?? false,
    title: page.title,
    path: path,
    element: page.page,
    page: page.page,
  };
};

export const sliceChartData = (data, dataKeyX, dataKeyY) => {
  /*
  Slice the data to only contain the dataKeyX and dataKeyY
  datakeyY can be an array of keys:
  {
    dataKeyX: "date_group",
    dataKeyY: ["error_count", "total_cost"]
  }
  */
  if (!data) return [];
  if (dataKeyY && Array.isArray(dataKeyY)) {
    return data.map((item) => {
      const newItem = {};
      newItem[dataKeyX] = item[dataKeyX];
      dataKeyY.forEach((key) => {
        newItem[key] = item[key] || 0;
      });
      return newItem;
    });
  } else {
    return data.map((item) => {
      return {
        [dataKeyX]: item[dataKeyX] || 0,
        [dataKeyY]: item[dataKeyY] || 0,
      };
    });
  }
};

export const handleSerializerErrors = (errors: any, callback = (errorString: string) => { }) => {
  // errors: {key: [error1, error2], key2: [error1, error2]}
  Object.keys(errors).forEach((key) => {
    errors[key].forEach((error: any) => {
      const errorString = `${key}: ${error}`;
      callback(errorString);
    });
  });
};

export const flattenObject = (obj) => {
  const result = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const temp = flattenObject(obj[key]);
      for (const tempKey in temp) {
        result[`${key}.${tempKey}`] = temp[tempKey];
      }
    } else {
      result[key] = obj[key];
    }
  }

  return result;
};

export const aggregateModelData = (data) => {
  // data: [{model, total_cost, total_tokens, average_latency, number_of_requests}]
  if (data.length === 0) return {};
  // loop through the data and aggregate the data by model
  const modelMap = data.reduce((totalMap, item) => {
    const { model, ...rest } = item;
    totalMap[model] = rest;
    return totalMap;
  }, {});
  return modelMap;
};

export const safeAccess = (array, index) => {
  if (array?.length > index) {
    return array[index];
  } else {
    return null;
  }
};
export const aggregateApiData = (data) => {
  // data: [{model, total_cost, total_tokens, average_latency, number_of_requests}]
  if (data.length === 0) return null;
  // loop through the data and aggregate the data by model
  const apiMap = data.reduce((totalMap, item) => {
    const { api, ...rest } = item;
    totalMap[api] = rest;
    return totalMap;
  }, {});
  return apiMap;
};
