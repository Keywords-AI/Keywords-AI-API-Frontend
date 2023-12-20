import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function ErrorHandling({title}) {
    return (
        <PageContent
        title={title}
        >
            <DocumentationMarkdown>
                {`## API Errors
Effective management of error responses ensures the stability of implementations using the Keywords AI API. Understanding and properly handling potential error codes maintains a fluid and professional user experience even when issues arise.

## 401: API Key Invalid
This error indicates that the API key provided in the request is not recognized by the server. Ensure that the key is correctly inserted and matches the key provided during your API setup. Double-check for any typographical errors or misconfigurations.
**Possible Solutions**
- Verify the API key for accuracy.
- Ensure no extra spaces or characters are added.

## 401: Key Not Active
Receiving this error implies that the API key utilized is not active, possibly due to expiration, manual deactivation, or pending verification.
**Possible Solutions**
- Check the status of your API key in your account settings.
- Confirm the key hasn’t been deactivated due to a security issue.

## 400: Key Has Reached Maximum Usage Limit
This error message signals that the API key has reached its allotted request or token usage limit or revoked by the server because it has passed the allotted active period.
**Possible Solutions**
- If applicable, consider upgrading your usage plan to accommodate higher volumes.
`}
            </DocumentationMarkdown>
        </PageContent>
    )
}


