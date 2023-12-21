import { PageContent, PageParagraph } from "src/components/Sections";
import { DocumentationMarkdown } from "src/components/Misc";
import React from 'react'

export function Request({ title }) {
    return (
        <PageContent
            title={title}
        >
            <PageParagraph
                heading="Request"
            >
                <DocumentationMarkdown>
                    {`You can paste the command below into your terminal to run your first API request. Make sure to replace **{YOUR_ACCESS_TOKEN}** with your secret API key.

<!-- CODE BOX -->

### Parameters

- **messages:** List of messages, or string, to send to GPT
- **suffix:** String to append to GPT response
- **max_tokens:** integer or null
- **temperature:** number or null
- **n:** integer or null, How many completions to generate for each prompt.
- **stream:** boolean, Whether to stream back partial progress.
- **logprobs:** integer or null, Include the log probabilities on the logprobs most likely tokens, as well the chosen tokens.
- **echo:** boolean, Echo back the prompt in addition to the completion
- **stop:** List of string, Stop sequence
- **presence_penalty:** number or null, How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics.
- **frequency_penalty:** number or null, How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.
- **best_of:** integer or null, Generates best_of completions server side and returns the "best" (the one with the lowest log probability per token). Results cannot be streamed.
- **logit_bias:** Map of tokens to logit bias values
`}
                </DocumentationMarkdown>
            </PageParagraph>

        </PageContent>
    )
}


