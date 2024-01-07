import React from 'react'
import { connect } from 'react-redux'
import { Button } from "src/components/Buttons";
import { createPaymentSession } from 'src/services/stripe';
const lookupKeys = import.meta.env.VITE_PRODUCT_LOOKUP_KEYS.split(',')


const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export const Payment = (props) => {
    const handlePayment = () => {
        console.log("Payment", lookupKeys);
        createPaymentSession(lookupKeys)
    }
    return (
        <div className="flex-col flex-grow self-stretch items-center justify-center">
            <Button
                variant="r4-primary"
                type="button"
                text="Pay your bill"
                onClick={handlePayment}
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)