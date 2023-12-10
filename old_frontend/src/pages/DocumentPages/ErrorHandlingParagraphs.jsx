import React from 'react'

export function ErrorParagraph() {
    return (
        <span>
            <span>
                {"We return the exact error code OpenAI provides, check "}
                <a className="text-primary"
                    style={{
                        cursor: "pointer",
                        textDecoration: "underline"
                    }}

                    href="https://platform.openai.com/docs/guides/error-codes/error-codes"
                    target="_blank"
                >this</a>
                {"."}
            </span>
            <br />
            <br />
            {"Reach out to team@keywordsai.co with any questions you have regarding this API documentation."}
        </span>
    )
}
