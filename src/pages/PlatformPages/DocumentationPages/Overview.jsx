import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function Overview({ title }) {
    return (
        <PageContent
            title={title}
        >
            <PageParagraph>
                <DocumentationMarkdown>
                    {`Keywords AI API serves as a unique "API Bartender for LLMs." Keywords AI assess LLMs for their performance in designated tasks and consolidating them into a unified API endpoint. When users submit a request, Keywords AI dynamically routes it to the most appropriate model for an response. This approach achieves the following:
                    
- **Enhanced Efficiency**: Achieve superior performance at reduced costs.  
- **Continuous Adaptation**: Continously upgrading Keywords AI API performance with the integration of the latest models.  
- **Uptime Assurance**: Maintain enhanced uptime by steering clear of models with degraded performance.  
- **Development Focus**: Concentrate on product enhancement, delegating the task of model optimization to Keywords AI.  
                    `}
                </DocumentationMarkdown>
            </PageParagraph>
            <PageParagraph
                heading={`Capabilities`}
            >
                <DocumentationMarkdown>
                    {`The capabilities of Keywords AI API encompass virtually every text-related task you can imagine. This includes, but is not limited to:

- **Content Generation**: Creating high-quality written content for various purposes.
- **Data Analysis**: Extracting and interpreting key information from large volumes of text.
- **Natural Language Understanding**: Comprehending and responding to user queries in a conversational manner.
- **Language Translation**: Offering accurate translations between multiple languages.
- **Sentiment Analysis**: Determining the sentiment behind text inputs, useful for customer feedback and social media monitoring.
- **Code Generation**: Assisting in software development by generating code snippets.
- **Educational Assistance**: Providing tutoring and educational content in a range of subjects.
`}
                </DocumentationMarkdown>
            </PageParagraph>
            <PageParagraph
                heading={`Key Concepts and Explanations`}
            >
                <DocumentationMarkdown>
                    {`### Large Language Models (LLMs)
LLMs are advanced AI models designed to understand, generate, and manipulate human language. They are trained on extensive datasets, enabling them to perform a wide range of text-based tasks with high accuracy.

### Tokens
In the context of LLMs, tokens refer to the smallest units of text processed by the model. A token can be as small as a single character or as large as a word. As an approximation, 1000 tokens are roughly equivalent to 750 words. For instance, this definition of a token (not including this sentence) is around 43 tokens.

### LLM Evaluation Frameworks
The Keywords AI API employs sophisticated evaluation frameworks to assess LLMs. These frameworks analyze model performance across various dimensions, such as accuracy, response time, and contextual relevance. For example, a model may be evaluated based on its ability to generate coherent text, translate languages accurately, or understand user intent in conversational AI applications. By continuously monitoring and evaluating LLMs, the API ensures that only the most effective models are utilized for user requests.
`}
                </DocumentationMarkdown>
            </PageParagraph>
        </PageContent>
    )
}


