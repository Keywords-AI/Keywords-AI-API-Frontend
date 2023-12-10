import React from 'react'
import { Arrow } from 'src/assets/svgs.jsx'
import { useNavigate } from 'react-router-dom'

export function RetrieveKeyParagraph() {
    const navigate = useNavigate();
    return (
        <div className="flex-col items-start gap-sm self-stretch">
            <span >
                {"To use the API, replace"}
                <span className="text-black">
                    {" {YOUR_ACCESS_TOKEN} "}
                </span>
                {"with your actual API key. The key is generated after you complete a payment. You can obtain your API keys "}<a href="https://platform.keywordsai.co/get-api-key" className="text-primary" target="blank" rel="noopener noreferrer">here</a>{"."}                </span>
            <button className="button-primary"
                onClick={() => {
                    navigate("/get-api-key");
                }}
            >
                Retrieve API key
                <Arrow />
            </button>
        </div>
    )
}
