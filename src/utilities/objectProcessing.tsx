import { AnyNode } from "postcss";
import { getDateStr, textToLink, capitalize } from "./stringProcessing";
import { Page } from "src/types";
import React, { ReactElement } from "react";
import {
  Billing,
  StripeBillingItem,
  Subscription,
  StripeSubscription,
} from "src/types";

export const stringOrBoolean = (string: string): boolean | string => {
  if (string === "true" || string === "false") {
    return string === "true";
  } else {
    return string;
  }
}

export const stringOrNumber = (string: string): number | string => {
  if (!isNaN(Number(string))) {
    return Number(string);
  } else {
    return string;
  }
}

export const checkBoxFieldToList = (
  field: boolean | string | string[] | number
): string[] | number[] => {
  if (typeof field === "boolean") {
    return [];
  } else if (typeof field === "string") {
    return [field];
  } else if (typeof field === "number") {
    return [field];
  } else {
    return field;
  }
};
import { colorTagsClasses } from "./constants";

export const digitToMonth = (digit, year) => {
  // let month = digit;
  // if (!digit) month = new Date().getMonth() + 1;
  // if (month === undefined) month = new Date().getMonth();
  // if (year === undefined) year = new Date().getFullYear();
  const now = new Date();
  let date = digit !== undefined ? digit : now.getDate();
  let month = digit !== undefined ? digit : now.getMonth();
  year = year !== undefined ? year : now.getFullYear();
  const monthMap = {
    0: "January",
    1: "February",
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
  return `${monthMap[month]}`;
};

export const digitToYear = (digit) => {
  const now = new Date();
  let year = digit !== undefined ? digit : now.getFullYear();
  return year;
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

export const processSubscription = (
  subscription: StripeSubscription
): Subscription => {
  return {
    name: capitalize(subscription?.items.data[0].plan.nickname ?? "none"),
    renewal_date: getDateStr(subscription?.current_period_end, false, true),
    amount: `$${(subscription?.items.data[0].plan.amount ?? 0) / 100}`,
    interval: capitalize(subscription?.items.data[0].plan.interval ?? ""),
  };
};

export const processBillingItem = (
  billingItem: StripeBillingItem,
  actions = (item: any): React.ReactNode => {
    return <></>;
  }
): Billing => {
  return {
    name: billingItem?.customer_name,
    email: billingItem?.customer_email,
    date: getDateStr(billingItem?.created, false, true),
    amount: `$${(billingItem?.amount_paid ?? 0) / 100}`,
    payment_id: billingItem?.id,
    actions: actions(billingItem),
  } as Billing;
};

export const processBillingList = (
  billingList: StripeBillingItem[],
  actions = (item: any): React.ReactNode => {
    return <></>;
  }
): Billing[] => {
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

export const handleSerializerErrors = (
  errors: any,
  callback = (errorString: string) => {}
) => {
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
    const { organization_key__name, ...rest } = item;
    totalMap[organization_key__name] = rest;
    return totalMap;
  }, {});
  return apiMap;
};

interface DataItem {
  date_group: string;
  [key: string]: any;
}

export const addMissingDate = (
  data: DataItem[],
  dateGroup: string,
  currntTimeRange: string
): DataItem[] => {
  if (!data) return [];
  const newDataArray: DataItem[] = [];
  const formatTimeUnit = (unit: number): string =>
    unit.toString().padStart(2, "0");
  const localeUtc = (dateStr: string): Date => {
    const date = new Date(dateStr);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  };
  const keys =
    data?.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "date_group")
      : [];
  const defaultFields = keys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
  const handleDailyCase = (): void => {
    const now = new Date();
    for (let hour = 0; hour < 24; hour++) {
      const found = data.find((d) => {
        return d.date_group.split(":")[0] === hour.toString();
      });
      newDataArray.push(
        found ? { ...found } : { date_group: hour + ":00", ...defaultFields }
      );
    }
  };
  switch (dateGroup) {
    case "daily":
      handleDailyCase();
      break;
    case "weekly":
      for (let day = 0; day < 7; day++) {
        const dayDate = new Date(currntTimeRange);
        dayDate.setDate(dayDate.getDate() - dayDate.getDay() + day);
        const dateString = `${formatTimeUnit(
          dayDate.getMonth() + 1
        )}/${formatTimeUnit(dayDate.getDate())}/${dayDate
          .getFullYear()
          .toString()
          .slice(-2)}`;
        const found = data.find(
          (d) => localeUtc(d.date_group).getDate() === dayDate.getDate()
        );
        newDataArray.push(
          found
            ? { ...found, date_group: dateString }
            : { date_group: dateString, ...defaultFields }
        );
      }
      break;
    case "monthly":
      const now = new Date(currntTimeRange);
      const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const month = formatTimeUnit(now.getMonth() + 1);
        const year = now.getFullYear().toString().slice(-2);
        const dayString = `${month}/${formatTimeUnit(day)}/${year}`;
        const found = data.find((d) => {
          const date = localeUtc(d.date_group);
          return date.getDate() === day && date.getMonth() === now.getMonth();
        });
        newDataArray.push(
          found
            ? { ...found, date_group: dayString }
            : { date_group: dayString, ...defaultFields }
        );
      }
      break;
    case "yearly":
      for (let month = 0; month < 12; month++) {
        const monthString = formatTimeUnit(month + 1);
        const found = data.find((d) => {
          const date = localeUtc(d.date_group);
          return date.getMonth() === month;
        });
        newDataArray.push(
          found
            ? { ...found, date_group: monthString }
            : { date_group: monthString, ...defaultFields }
        );
      }
      break;
    default:
      handleDailyCase();
      break;
  }
  return newDataArray;
};

export const getColorMap = (data, currentMetric, isModel) => {
  const sortedData = data.sort((a, b) => {
    return b[currentMetric] - a[currentMetric];
  });
  const key = isModel ? "model" : "organization_key__name";
  let colorMap = {};
  sortedData.forEach((item, index) => {
    colorMap[item[key] || "unknown model"] =
      colorTagsClasses[index % colorTagsClasses.length];
  });
  return colorMap;
};
