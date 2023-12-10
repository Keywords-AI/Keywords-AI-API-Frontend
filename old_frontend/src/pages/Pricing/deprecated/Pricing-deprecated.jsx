import React from 'react'
import './style.css'
import { Arrow, Tick } from "src/assets/svgs"
import { createPaymentSession } from "src/services/stripe"
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {};

function Pricing({ user }) {
    const navigate = useNavigate()
    // React.useEffect(() => {
    //     // Check if the script is already loaded
    //     if (document.getElementById('stripe-pricing-table-script')) return;

    //     // Create a new script element
    //     const script = document.createElement('script');
    //     script.id = 'stripe-pricing-table-script';
    //     script.src = 'https://js.stripe.com/v3/platform/pricing-table.js';
    //     script.async = true;

    //     // Append the script to the document body
    //     document.body.appendChild(script);
    // }, []);


    return (
        <div className="main-section-bottom bg-gray2">
            {/* <stripe-pricing-table pricing-table-id="prctbl_1NnY65IW4Tl5ncm3YlCSuAuZ"
                publishable-key="pk_live_51NOKoNIW4Tl5ncm3USGUuzoGHlKOxpje7tBf1ylQNnaRTCkBsoC43zuMlkgqkjpazPEI4S4UeHTEH7oxk6dgrUoA00nJc5u4f6">
            </stripe-pricing-table> */}
            <div className="flex-col main-center cross-center g-md stretch">
                <h1 className="display-lg">Affordable Access to High-Quality AI</h1>
                <div className="text-lg">
                    Choose the best plan that fits your needs.
                </div>
            </div>
            <div className="flex-col cross-center g-lg stretch">

                <div className="pricing-card-container bg-white"
                    style={{
                        boxShadow: "0px 0px 8px 2px rgba(0, 51, 102, 0.40)"
                    }}
                >
                    <div className='pricing-card'>
                        <div className="flex-col g-xs cross-start">
                            <div className="display-sm">
                                {"Standard"}
                            </div>
                            <div className="text-md">
                                {"Access our API with a pay-as-you-go pricing. Billed monthly, only pay for what you use."}
                            </div>
                        </div>
                        {user.active_subscription ?
                            <button className="button-primary bg-success">
                                {"Subscribed"}
                                <Tick />
                            </button> :
                            <button className="button-primary"
                                onClick={() => {
                                    if (!user.email)
                                        navigate("/login?next=/platform/pricing")
                                    else {
                                        createPaymentSession({
                                            lookup_keys: ["keywordsai_fixed_plan", "keywordsai_unit_plan"],
                                        })
                                    }
                                }}
                            >
                                {"Get Started"}
                                <Arrow />
                            </button>}
                    </div>
                    <div className="standard-pricing bg-gray1">
                        <div className="display-sm">
                            4.2¢ / 1000 tokens
                        </div>
                        <div className="text-md">
                            starting at $9.99 per month
                        </div>
                    </div>
                </div>
                <div className="pricing-card-container bg-primary">
                    <div className='pricing-card bg-primary'>
                        <div className="flex-col g-xs cross-start">
                            <div className="display-sm t-white">
                                {"Custom"}
                            </div>
                            <div className="text-md t-white">
                                {"Design a custom package — available for businesses with large volume or unique use cases."}
                            </div>
                        </div>
                        <button className="button-secondary-white"
                            onClick={() => { window.open("https://airtable.com/app5rlVP01ZZNXurS/shrEyS6G8lAoLX0E3", "_blank") }}
                        >
                            {"Talk to us"}
                            <Arrow fill="var(--black)" />
                        </button>
                    </div>
                    <div className="custom-pricing bg-primary t-white">
                        <div className="pricing-feature">
                            <div className="text-md">
                                Volume discounts
                            </div>
                        </div>
                        <div className="pricing-feature">
                            <div className="text-md">
                                Multi-model support
                            </div>
                        </div>
                        <div className="pricing-feature">
                            <div className="text-md">
                                Custom usage plan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Pricing)