import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function QuickStart({title}) {
    return (
        <PageContent
        title={title}
        >
            <DocumentationMarkdown>
                {`

## Setup
The Keywords AI API endpoint is crafted to provide functionality that aligns closely with OpenAI's API, allowing for a simplified transition between the two. Developers who have existing infrastructures built around OpenAI's API can switch to using Keywords AI with minimal adjustments to their current codebase. To transition your API calls from OpenAI to Keywords AI, perform the following adjustments:

1. **URL Change**: Modify the API endpoint URL in your code from OpenAI’s URL to the Keywords AI endpoint URL: \`https://keywordsai.co/api/generate/\`.
2. **Request Body Adjustment**: Remove the “model” parameter from the request body in your API calls, as the Keywords AI endpoint is standardized to always utilize the Keywords AI model, negating the necessity for model specification in the API calls.
`}
            </DocumentationMarkdown>
        </PageContent>
    )
}


