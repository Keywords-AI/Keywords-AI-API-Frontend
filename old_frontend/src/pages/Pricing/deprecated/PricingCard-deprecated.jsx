import React from 'react'
import './style-card.css'
import { Arrow } from "src/assets/svgs"

export default function PricingCard({ backgroundColor = "var(--white)", title, text, buttonText, rightElement, borderStyle}) {
    return (
        <div className="pricing-card-container"
            style={borderStyle}
        >

            <div className='pricing-card' style={{
                backgroundColor: backgroundColor
            }}>
                <div className="pricing-text-group">
                    <div className="text-sm">
                        {title}
                    </div>
                    <div className="text-md">
                        {text}
                    </div>
                </div>
                <div className="button-primary">
                    {buttonText}
                    <Arrow />
                </div>
            </div>
            {rightElement}
        </div>
    )
}
