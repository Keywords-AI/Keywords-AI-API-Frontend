import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import { Button } from "src/components";
import React from 'react'

export function ApiKeys({ title }) {
    return (
        <PageContent
            title={title}
        >
            <PageParagraph heading="What is an API Key?">
                <DocumentationMarkdown>
                    {`An API key is a unique identifier used primarily for authentication and access control in software applications. It acts like a passcode that allows your application to communicate with an API (Application Programming Interface). By providing an API key with your requests, the API can verify your identity or the identity of your application and ensure you have the necessary permissions to use the API's services. This is crucial for maintaining security, preventing unauthorized access, and tracking API usage. In essence, an API key is a way to let the API know that the request it's receiving is coming from a trusted source.`}
                </DocumentationMarkdown>
            </PageParagraph>

            <PageParagraph
                heading="Use the API Key"
            >
                <DocumentationMarkdown>
                    {`If you are using OpenAI SDK:
                    \`\`\`
openai.base_url = "https://platform.keywordsai.co/api/generate/"
openai.api_key = "{YOUR_KEYWORDSD_AI_API_KEY}" # You should replace this with your actual key
...other code...
                    \`\`\`
                    `}
                </DocumentationMarkdown>
            </PageParagraph>
            <PageParagraph
                heading="Get an API Key"
            >
                <DocumentationMarkdown>
                    {`To procure your API key, navigate to your [API Keys](https://platform.keywordsai.co/platform/organization/api-keys) page on the platform.`}
                </DocumentationMarkdown>
                <Button variant="r4-primary" text="Generate an API key now!"/>
                <DocumentationMarkdown>
                {`**Careful!!!** API keys are secret and should not be shared publicly. Do not include your API key in your source code or client-side JavaScript. If you believe your API key has been compromised, revoke it and replace it with a new one.`}
                </DocumentationMarkdown>
            </PageParagraph>
            <PageParagraph
                heading="Lost your API Key?"
            >
                <DocumentationMarkdown>
                    {`Unfortunately, API key will only show once after you generate it. If you have lost your API key, you will have to regerate your [API Keys](https://platform.keywordsai.co/platform/organization/api-keys) on the platform.`}
                </DocumentationMarkdown>
            </PageParagraph>
            
        </PageContent>
    )
}


