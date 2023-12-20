import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function Request({title}) {
    return (
        <PageContent
        title={title}
        >
            <DocumentationMarkdown>
                {`## Request Object
<RequestParagraph />
`}
            </DocumentationMarkdown>
        </PageContent>
    )
}


