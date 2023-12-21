import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function ErrorHandling({ title }) {
    return (
        <PageContent
            title={title}
        >
            <PageParagraph>
                <DocumentationMarkdown>
                    {`Keywords AI API returns the following error codes and descriptions in the response body in the following cases:`}
                </DocumentationMarkdown>
            </PageParagraph>
            <PageParagraph
                heading="401: API Key Invalid"
            >
                <DocumentationMarkdown>
                    {`This error indicates that the API key provided in the request is not recognized by the server. Ensure that the key is correctly inserted and matches the key provided during your API setup. Double-check for any typographical errors or misconfigurations.

**Possible Solutions**
- Verify the API key for accuracy.
- Ensure no extra spaces or characters are added.`}
                </DocumentationMarkdown>
            </PageParagraph>
            <PageParagraph
                heading="401: Key Not Active"
            >
                <DocumentationMarkdown>
                    {`Receiving this error implies that the API key utilized is not active, possibly due to expiration, manual deactivation, or pending verification.

**Possible Solutions**
- Check the status of your API key in your account settings.
- Confirm the key hasn’t been deactivated due to a security issue.`}
                </DocumentationMarkdown>
            </PageParagraph>
            <PageParagraph
                heading="400: Key Has Reached Maximum Usage Limit"
            >
                <DocumentationMarkdown>
                    {`This error message signals that the API key has reached its allotted request or token usage limit or revoked by the server because it has passed the allotted active period.

**Possible Solutions**
- If applicable, consider upgrading your usage plan to accommodate higher volumes.`}
                </DocumentationMarkdown>
            </PageParagraph>
        </PageContent>
    )
}


