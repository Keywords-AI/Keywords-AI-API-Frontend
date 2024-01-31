const dateStr = "2024-01-30T22:15:34.376785Z";

const date = new Date(dateStr);

const localeUtc = (dateStr) => {
    const date = new Date(dateStr);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
};


console.log(date);
console.log(localeUtc(dateStr));