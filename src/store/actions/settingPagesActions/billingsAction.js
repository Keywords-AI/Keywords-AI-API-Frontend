export const SET_BILLINGS = "SET_BILLINGS";


export const setBillings = (billingList) => {
    return {
        type: SET_BILLINGS,
        payload: billingList,
    };
};