import React from 'react'
import CodeBox from "src/components/CodeBox/CodeBox"

const responseObjs = [
    {
        language: "stream: true",
        code: `{
    "id": "chatcmpl-123",
    "object": "chat.completion.chunk",
    "created": 1677652288,
    "choices": [{
        "index": 0,
        "delta": {
        "content": "Hello",
        },
        "finish_reason": "stop"
    }]
}
`,
    },
    {
        language: "stream: false",
        code: `{
    "id":"chatcmpl-7uq0thCaRb48VAh8jRC0iyeYGFnKT",
    "object":"chat.completion","created":1693780663,
    "choices":[{
        "index":0,
        "message":{
            "role":"assistant","content":"Hello! How can I assist you today?"
            },"finish_reason":"stop"
    }],
    "usage":{
        "prompt_tokens":8,"completion_tokens":9,"total_tokens":17
    }
}`
    }
];

const readStreamObjs = [
    {
        language: "JavaScript",
        code: `const readStream = async (
streamResponse,
callbackFunction, // The callback function to handle each "token" from the stream
streamComplete = (done) => console.log("Stream done")
) => {
/* Return an abort control */

const reader = streamResponse.body.getReader();
const decoder = new TextDecoder();
const abortController = new AbortController();
const signal = abortController.signal;

// Start reading the stream
(async () => {
    try {
    while (true) {
        const { done, value } = await reader.read();
        if (done || signal.aborted) {
        streamComplete();
        break;
        }
        const message = decoder.decode(value);

        for (const line of message.split("---")) {
        // Line is a JSON string
        callbackFunction(line);
        }
    }
    } catch (e) {
    console.error("Stream error:", e);
    }
})();

// Return a function to abort the stream from outside
return () => {
    console.log("Aborting stream");
    abortController.abort();
};
};

export default readStream;
          `
    }
]


export function ResponseParagraph() {
    return (
        <div className="flex-col items-start gap-lg self-stretch">
            <CodeBox codeObjs={responseObjs} />
            <span>
                <strong>
                    Non-streaming Response
                </strong>
                <br />
                <br />
                <span>

                    When streaming is disabled, the API endpoint delivers a singular JSON response, containing the model-generated text along with pertinent information, ensuring succinct and straightforward data processing.",
                </span>
                <br/>
                <br/>
                <strong>
                    Streaming Response
                </strong>
                <br />
                <br />
                <span>

                    <span>
                        {
                            "Activating the streaming option alters the endpoint's output to produce a sequence of JSON objects, each"
                        }
                        <strong>{" separated by a “----” delimiter. "}</strong>
                        {
                            "This facilitates real-time interaction and partial data utilization, enhancing dynamic application responses and user experiences."
                        }
                    </span>
                </span>
                <strong>
                    {"Read Stream Function"}
                </strong>
                <br />
                <br />
                <span>
                    {
                        "The following function can be used to read a streaming response from the API. It takes in the response object, a callback function to handle the response, and an optional callback function to handle the end of the stream."
                    }
                </span>
                <br />
                <br />
                <CodeBox codeObjs={readStreamObjs}/>
            </span >
        </div>

    )
}
