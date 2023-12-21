import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function Overview({title}) {
    return (
        <PageContent
        title={title}
        >
            <DocumentationMarkdown>
                {`
The Keywords AI API grants developers access to GPT-4 level natural language model endpoints, enabling applications to both comprehend and generate text. This API facilitates varied applications such as automating content creation, deploying chatbots, and several other use cases that require understanding and producing text in a coherent and contextually relevant manner. Consequently, developers can leverage this API to explore and implement a myriad of textual data applications and solutions.

`}
            </DocumentationMarkdown>
        </PageContent>
    )
}


