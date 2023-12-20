import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function RateLimit({title}) {
    return (
        <PageContent
        title={title}
        >
            <DocumentationMarkdown>
                {`## What is a Rate Limit
Rate limiting is the process of controlling the rate at which a user can make requests to the API, typically implemented to preserve the integrity and availability of the service, preventing any individual user or system from overloading it.

## Why Rate Limits Exist
**Ensure Fair Usage**: Prevents any single user or system from monopolizing the server resources, ensuring equitable access for all users.
**Maintain Quality of Service**: Helps to assure that the service remains available and responsive to all users by preventing accidental or intentional service overloads.
**Security**: Acts as a rudimentary shield against certain types of attacks, such as DDoS (Distributed Denial of Service).

## Keywords AI’s Rate Limit
- Flex 8K plan users: 20 requests per minute (RPM) and 40000 tokens per minute (TPM).
- Users with higher level plans: 200 RPM and 300000 TPM.
`}
            </DocumentationMarkdown>
        </PageContent>
    )
}


