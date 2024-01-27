import { 
    SET_BILLINGS,
    SET_CURRENT_BILLING,
    SET_CURRENT_SUBSCRIPTION,
 } from 'src/store/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { StripeBillingItem, Subscription } from 'src/types';

type BillingState = { // Raw data from stripe
    billings: StripeBillingItem[],
    currentBilling: StripeBillingItem,
    currentSubscription: Subscription,
}

const initState: BillingState = {
    billings: [],
    currentBilling: null,
    currentSubscription: null,
};


export default function billingsReducer(state = initState, action: PayloadAction<any>): BillingState {
    switch (action.type) {
        case SET_BILLINGS:
            return {...state, billings:action.payload};
        case SET_CURRENT_BILLING:
            return {...state, currentBilling:action.payload};
        case SET_CURRENT_SUBSCRIPTION:
            return {...state, currentSubscription:action.payload};
        default:
            return state;
    }
}