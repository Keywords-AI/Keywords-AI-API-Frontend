import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function ApiKeys({title}) {
    return (
        <PageContent
        title={title}
        >
            <DocumentationMarkdown>
                {`

## Get API Key
The Keywords AI API utilizes API keys to verify and process requests. To procure your API key, navigate to your [API Keys](/platform/organization/api-keys) page on the platform. **Handle API Key with Care!** Your API key should be kept confidential. Avoid sharing it or embedding it in client-side code (such as browsers or applications) to safeguard it against unauthorized access. Ensure that production requests are conveyed through your backend server, allowing your API key to be securely retrieved from an environment variable or a key management service, thereby reinforcing the security of your API interactions.
`}
            </DocumentationMarkdown>
        </PageContent>
    )
}


