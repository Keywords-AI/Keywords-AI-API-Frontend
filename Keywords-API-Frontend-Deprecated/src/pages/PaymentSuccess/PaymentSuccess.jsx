import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BigSuccess } from 'src/assets/svgs'

export default function PaymentSuccess() {
    const navigate = useNavigate()
    return (
        <div
            className='redirect-container'
        >
            <div className="flex-col justify-center items-center gap-md self-stretch">
                <BigSuccess />
                <div className="flex-col justify-center items-center gap-xs self-stretch">
                    <div className="display-xs">
                        {"Payment successful!"}
                    </div>
                    <div className="text-md">
                        {"All set! Your payment went through smoothly."}
                    </div>
                </div>
            </div>
            <button className="button-primary bg-success"
                onClick={() => { navigate("/platform/organization/api-keys") }}
            >
                {"Retrieve API keys"}
            </button>
        </div>
    )
}
