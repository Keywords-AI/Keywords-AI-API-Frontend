import React, { useEffect } from "react";
import PlatformLeftDrawer from "src/components/PlatformLeftDrawer/PlatformLeftDrawer";
import DocumentationPage from "src/components/Document/DocumentationPage";
import { textToLink } from "src/utilities/utilities";
import { Outlet } from "react-router-dom";
import { RetrieveKeyParagraph } from "./APIKeyParagraphs";
import { RequestParagraph } from "./RequestParagraphs";
import { ResponseParagraph } from "./ResponseParagraphs";
import { ErrorParagraph } from "./ErrorHandlingParagraphs";
import ReactMarkdown from "react-markdown";

const pages = [
  {
    title: "Overview",
    paragraphs: [
      {
        text: "The Keywords AI API grants developers access to GPT-4 level natural language model endpoints, enabling applications to both comprehend and generate text. This API facilitates varied applications such as automating content creation, deploying chatbots, and several other use cases that require understanding and producing text in a coherent and contextually relevant manner. Consequently, developers can leverage this API to explore and implement a myriad of textual data applications and solutions.",
      },
    ],
  },
  {
    title: "Key Concepts",
    paragraphs: [
      {
        title: "GPTs",
        text: "GPTs (generative pre-trained transformers) are models developed to create coherent and contextually appropriate text based on the input provided. GPTs generate text by predicting subsequent words in a sequence and are capable of producing a wide array of text forms, contributing to their utility in various applications.",
      },
      {
        title: "LLMs",
        text: "LLMs (Large Language Models), akin to GPTs, predict ensuing words in textual sequences. These models are pre-trained on extensive text corpora, equipping them with the capability to comprehend context, create textual responses, or manipulate text, thereby enhancing their applicability across numerous Natural Language Processing (NLP) tasks.",
      },
      {
        title: "Tokens",
        text: `Tokens in language processing represent units of text that models interpret. A token can range in size from a single character to an entire word (e.g., 'a' or 'apple'). Grasping token usage is crucial for efficiently managing API interactions and controlling associated costs. A general guideline: 1 token is roughly equivalent to 4 characters or 0.75 words in English.
It's vital to acknowledge that the total token count, encompassing both the prompt and the generated output, must not exceed the model's maximum context length to ensure successful operation.`
            },
        ]
    },
    {
        title: "Quick Start",
        paragraphs: [
            {
                title: "Setup",
                text: [
                    "The Keywords AI API endpoint is crafted to provide functionality that aligns closely with OpenAI's API, allowing for a simplified transition between the two. Developers who have existing infrastructures built around OpenAI's API can switch to using Keywords AI with minimal adjustments to their current codebase.",
                    "To transition your API calls from OpenAI to Keywords AI, perform the following adjustments:",
                    <span>1. <strong>URL Change</strong>: Modify the API endpoint URL in your code from OpenAI’s URL to the Keywords AI endpoint URL: <strong>https://keywordsai.co/api/generate/</strong>.</span>,
                    <span>2. <strong>Request Body Adjustment</strong>: Remove the “model” parameter from the request body in your API calls, as the Keywords AI endpoint is standardized to always utilize the Keywords AI model, negating the necessity for model specification in the API calls.</span>
                ]
            },
        ]
    },
    {
        title: "Authentication",
        paragraphs: [
            {
                title: "Get API Key",
                text: <span>
                    <span>
                        {"The Keywords AI API utilizes API keys to verify and process requests. To procure your API key, navigate to your "}
                    </span>
                    <a className="text-primary" href="/platform/organization/api-keys" target="_blank">
                        {"API Keys"}
                    </a>
                    <span>
                        {" page on the platform."}
                    </span>
                    <strong>{"Handle API Key with Care! "}</strong> Your API key should be kept confidential. Avoid sharing it or embedding it in client-side code (such as browsers or applications) to safeguard it against unauthorized access. Ensure that production requests are conveyed through your backend server, allowing your API key to be securely retrieved from an environment variable or a key management service, thereby reinforcing the security of your API interactions.
                </span>
            },
        ]
    },
    {
        title: "Endpoint",
        paragraphs: [
            {
                title: "Request Object",
                text: <RequestParagraph />
            },
            {
                title: "Response Object",
                text: <ResponseParagraph />
            },
        ]
    },
    {
        title: "Guide",
        paragraphs: [
            {
                title: "Capabilities",
                text: <span>

                    Leveraging the advanced capabilities of the Keywords AI LLM (Language-Model-Like Model) endpoint, developers can access a rich suite of functionalities adept at understanding and generating both natural language and code. The inputs to Keywords AI LLM, termed "prompts," serve as strategic instructions that navigate and shape the model’s outputs, essentially forming the means through which it is “programmed” or directed.

                    Through the Keywords AI LLM endpoint, developers have the capability to architect applications that can:

                    <li>Compose draft documents</li>
                    <li>Develop computer code</li>
                    <li>Respond to inquiries using a knowledge base</li>
                    <li>Perform textual analyses</li>
                    <li>Establish conversational agents</li>
                    <li>Implement natural language interfaces within software</li>
                    <li>Facilitate tutoring across varied topics</li>
                    <li>Enable multi-language translations</li>
                    <li>Craft realistic characters for gaming environments</li>
                    <li>...and much more, across a multitude of domains and industries!</li>
                </span>

            },
            {
                title: "Best Practices",
                text:
                    [
                        <strong>Crafting Effective Prompts</strong>,
                        <span>
                            <li><strong>Be Explicit</strong>: Clearly articulate the desired output format and content in your prompt to guide the model towards generating the expected responses.</li>
                            <li><strong>Use Examples</strong>: If possible, provide examples within the prompt to offer a reference for the desired output, assisting the model in comprehending the task.</li>
                            <li><strong>Manage Token Usage</strong>: Be mindful of the total token count in both input and output to ensure it remains within the model's maximum limit, optimizing costs and performance.</li>
                            <li><strong>Iterative Refinement</strong>: Experiment with different prompt structures and gradually refine based on the obtained outputs to enhance model performance and accuracy.</li>
                        </span>,
                        <strong>Implementing Model Parameters</strong>,
                        <span>
                            <li><strong>Temperature Setting</strong>: Adjust the temperature parameter to control randomness in output (lower values make output more deterministic and focused; higher values introduce more variability).</li>
                            <li><strong>Max Tokens</strong>: Set a max tokens limit to manage response length and prevent overly verbose outputs.</li>
                            <li><strong>Frequency of API Calls</strong>: Be mindful of the rate limits and structure API calls accordingly to maintain a smooth user experience and compliance with usage guidelines.</li>
                        </span>,
                        <strong>Handling Outputs</strong>,
                        <span>
                            <li><strong>Parse Responsively</strong>: Whether dealing with streaming or non-streaming responses, ensure your application can efficiently parse and manage the output data, safeguarding against potential errors or data loss.</li>
                            <li><strong>Manage Error Responses</strong>: Implement robust error-handling mechanisms to manage potential API or parsing errors gracefully, maintaining a seamless user experience.</li>
                        </span>,
                        "Employing these best practices while interacting with the Keywords AI LLM endpoint ensures proficient usage, yielding high-quality, reliable outputs across various applications and implementations. Remember, iteration and experimentation are key to harnessing the full potential of the model in your specific use case."
                    ]
            }
        ]
    },
    {
        title: "Rate Limit",
        paragraphs: [
            {
                title: "What is a Rate Limit",
                text: "Rate limiting is the process of controlling the rate at which a user can make requests to the API, typically implemented to preserve the integrity and availability of the service, preventing any individual user or system from overloading it."
            },
            {
                title: "Why Rate Limits Exist",
                text:
                    <span>

                        <strong>Ensure Fair Usage</strong>: Prevents any single user or system from monopolizing the server resources, ensuring equitable access for all users.
                        <br />
                        <strong>Maintain Quality of Service</strong>: Helps to assure that the service remains available and responsive to all users by preventing accidental or intentional service overloads.
                        <br />
                        <strong>Security</strong>: Acts as a rudimentary shield against certain types of attacks, such as DDoS (Distributed Denial of Service).
                    </span>

            },
            {
                title: "Keywords AI’s Rate Limit",
                text:
                    <span>

                        <li>Flex 8K plan users: 20 requests per minute (RPM) and 40000 tokens per minute (TPM).</li>                        <br />
                        <li>Users with higher level plans: 200 RPM and 300000 TPM.</li>
                        <br />
                        <br />
                        Always ensure your application logic can handle rate limiting gracefully, perhaps by implementing a queueing system or providing user feedback about retry intervals, maintaining a smooth and professional user experience even when limits are reached.
                    </span>

            },
        ]
    },
    {
        title: "Error Codes",
        paragraphs: [
            {
                title: "API Errors",
                text: "Effective management of error responses ensures the stability of implementations using the Keywords AI API. Understanding and properly handling potential error codes maintains a fluid and professional user experience even when issues arise."
            },
            {
                title: "401: API Key Invalid",
                text: <span>
                    This error indicates that the API key provided in the request is not recognized by the server. Ensure that the key is correctly inserted and matches the key provided during your API setup. Double-check for any typographical errors or misconfigurations.
                    <br />
                    <br />
                    <strong>Possible Solutions</strong>

                    <li>Verify the API key for accuracy.</li>
                    <li>Ensure no extra spaces or characters are added.</li>
                </span>
            },
            {
                title: "401: Key Not Active",
                text: <span>
                    Receiving this error implies that the API key utilized is not active, possibly due to expiration, manual deactivation, or pending verification.
                    <br />
                    <br />
                    <strong>Possible Solutions</strong>

                    <li>Check the status of your API key in your account settings.</li>
                    <li>Confirm the key hasn’t been deactivated due to a security issue.</li>
                </span>
            },
            {
                title: "400: Key Has Reached Maximum Usage Limit",
                text: <span>
                    This error message signals that the API key has reached its allotted request or token usage limit or revoked by the server because it has passed the allotted active period.
                    <br />
                    <br />
                    <strong>Possible Solutions</strong>

                    <li>If applicable, consider upgrading your usage plan to accommodate higher volumes.</li>                </span>
            },
            {
                text: <span>
                    In each case, implementing robust error-handling mechanisms, such as retry logic, user notifications, or alternative pathways, ensures that your application remains user-friendly and reliable even when interacting with the API under exceptional circumstances or error conditions. Always prioritize providing clear communication to users about any issues and expected resolution times or alternative actions they can take.
                </span>
            },
            {
                title: "Support",
                text: <span>
                    <span>
                        {"You can reach out to us at "}
                    </span>
                    <a href="mailto:team@keywordsai.co" className="text-primary">team@keywordsai.co</a>
                    <span>

                        {" with any questions you have regarding API usage."}
                    </span>
                </span>
            }
        ]
    },

];

const sections = [
  {
    title: "Get Started",
    pages: pages,
  },
];

export function DocumentationPages() {
  const PlatformDrawerMemo = React.memo(PlatformLeftDrawer);
  return (
    <div className="flex-row flex-1  ">
      <PlatformDrawerMemo sections={sections} />
      <Outlet />
    </div>
  );
}

export const DocumentationChildren = pages.map((page, index) => {
  return {
    path: textToLink(page.title),
    element: <DocumentationPage key={index} {...page} />,
  };
});
