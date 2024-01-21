import { variantType } from "src/types/button";

export type PricingButtonParams = {
    buttonText: string;
    buttonVariant: variantType;
    buttonOnClick: () => void;
};

export type Pricing = {
    title: string;
    plan: string;
    subtitle: string;
    price: string;
    billFrequency?: string;
    featureTitle: string;
    features: string[];
}

export type PricingCardProps = Pricing & {
    buttonText: string,
    buttonOnClick: () => void,
    buttonVariant: variantType,
};

export type PricingCardParams = Pricing & {
    downgradeParams: PricingButtonParams;
    buttonParams: PricingButtonParams;
};
