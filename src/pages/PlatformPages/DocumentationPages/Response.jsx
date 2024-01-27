import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function Response({title}) {
    return (
        <PageContent
        title={title}
        >
            <DocumentationMarkdown>
                {`## Response Object
<ResponseParagraph />
`}
            </DocumentationMarkdown>
        </PageContent>
    )
}


