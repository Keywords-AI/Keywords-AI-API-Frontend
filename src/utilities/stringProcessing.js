export const textToLink = (text) => {
  return text.toLowerCase().replaceAll(" ", "-");
};

export const getDateStr = (date, lastUsed = false, inSeconds) => {
  var dateFromAPI;
  var checkedDate;
  if (inSeconds && date) {
    checkedDate = date * 1000;
  } else {
    checkedDate = date;
  }
  if (!date && lastUsed) return "Never";
  else if (!date) {
    var dateFromAPI = new Date();
  } else {
    var dateFromAPI = new Date(checkedDate);
  }
  const timeStamp = dateFromAPI.getTime();
  const format = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  };
  if (timeStamp === 0) {
    return "Never";
  } else {
    return dateFromAPI.toLocaleString("en-US", format);
  }
};

export const enumErrors = (
  response,
  setErrors = (error) => console.log(error)
) => {
  setErrors([]); // Clear previous errors
  Object.keys(response).forEach((key) => {
    const value = response[key];
    if (Array.isArray(value)) {
      value.forEach((error) => {
        setErrors((prev) => [...prev, `${key}:${error}`]);
      });
    } else {
      setErrors((prev) => [...prev, value]);
    }
  });
};

export const retrieveContext = (plan_name) => {
  const contextDictionary = {
    flex_8k: "8K",
    flex_16k: "16K",
    flex_32k: "32K",
  };
  return plan_name in contextDictionary ? contextDictionary[plan_name] : "8K";
};

export const retrievePlanName = (context) => {
  const planDictionary = {
    "8K": "flex_8k",
    "16K": "flex_16k",
    "32K": "flex_32k",
  };
  console.log("context", context);
  console.log("planDictionary", planDictionary[context]);
  return context in planDictionary ? planDictionary[context] : "flex_8k";
};

export const firstNameInitial = (firstName) => {
  return firstName.charAt(0).toUpperCase();
};
