import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function Integrations({ title }) {
    return (
        <PageContent
            title={title}
        >
            <PageParagraph
                heading="Lost your API Key?"
            >
                <DocumentationMarkdown>
                    {`Keywords AI integrates models from various providers, offering a diverse range of capabilities to suit different needs. Our platform allows users to leverage their own API keys, enabling them to use their personal account credits for specific services. This integration feature ensures that you have the flexibility and convenience to work with your preferred providers seamlessly.

For more details on how to integrate your API keys and manage your integrations, please visit our [Integrations Page](/integrations).

### Available Vendors

The following table lists the vendors currently available for integration with Keywords AI, along with the number of models they offer and the date of integration:

| Vendor Name | Number of Models | Integration Date |
|-------------|------------------|------------------|
| OpenAI      | 5                | Dec 13, 2023     |
| Anthropic   | 4                | Dec 13, 2023     |
| AI21 Labs   | 3                | Dec 13, 2023     |
| Cohere      | 1                | Dec 15, 2023     |
| Google      | 1                | Dec 15, 2023     |
    `}
                </DocumentationMarkdown>
            </PageParagraph>
        </PageContent>
    )
}


