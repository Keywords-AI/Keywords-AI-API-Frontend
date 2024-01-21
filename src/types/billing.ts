import React from 'react';
// Sorry we have to reinvent the wheel, we are dealing with stripe objects passed from python
export type Billing = {
    name: string,
    email: string,
    date: string,
    payment_id: string,
    amount: string,
    actions?: React.ReactNode,
} | null;

export type Subscription = {
    name: string,
    interval: string,
    amount: string,
    renewal_date: string,
} | null;

export type StripeBillingItem = {
    customer_name: string;
    customer_email: string;
    created: number;
    amount_paid: number;
    id: string;
    // Add other properties as needed
} | null;

export type StripePlan = {
    nickname: string;
    amount: number; // in cents
    interval: string;
};

export type StripeSubscriptionItem = {
    plan: StripePlan;
};

export type StripeSubscription = {
    current_period_end: number;
    items: {
        data: StripeSubscriptionItem[];
    }
} | null;