import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function QuickStart({ title }) {
    return (
        <PageContent
            title={title}
        >
            <PageParagraph>
                <DocumentationMarkdown>
                {`Keywords AI API is completely compatible with OpenAI SDK. You can easiliy integrate Keywords AI API into your code base  in just a few lines of code.`}
                </DocumentationMarkdown>
            </PageParagraph>
            <PageParagraph
                heading={`Installation`}
            >
                <DocumentationMarkdown>
                {`## Install OpenAI SDK for Python

\`pip install openai\`

## Follow these steps to integrate Keywords AI API into your code base
1. **URL Change**: Modify the API endpoint URL in your code from OpenAI’s URL to the Keywords AI endpoint URL: \`https://keywordsai.co/api/generate/\`.
2. **API Key**: Replace the OpenAI API key with your Keywords AI API key.
3. **Parameters**: Models parameter becomes optional.

\`\`\`
import openai
client = openai.OpenAI()
openai.base_url = "https://platform.keywordsai.co/api/generate/"
openai.api_key = "{YOUR_KEYWORDSD_AI_API_KEY}" # You should replace this with your actual key
print(client.chat.completions.create(
    model = "gpt-4-0613",
    messages = [{"role": "user", "content": "Say 'Hello World'"}]))
\`\`\`

The results should be printed in the console.

\`\`\`
ChatCompletion(id='chatcmpl-8Y0J7j2oWReB3mJrqW2H5VQ9UzUGN', 
choices=[
    Choice(
        finish_reason='stop', 
        index=0, 
        message=ChatCompletionMessage(content='Hello World', role='assistant', function_call=None, tool_calls=None), logprobs=None)], 
        created=1703115025, 
        model='gpt-4-0613', 
        object='chat.completion', 
        system_fingerprint=None, 
        usage=CompletionUsage(completion_tokens=9, prompt_tokens=12, total_tokens=21))
\`\`\`
`}
                </DocumentationMarkdown>
            </PageParagraph>
        </PageContent>
    )
}


