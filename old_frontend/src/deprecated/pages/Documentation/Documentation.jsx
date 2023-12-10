import React from 'react'
import { Arrow } from 'src/assets/svgs.jsx'
import "./static/css/style.css"
import CodeBox from 'src/components/CodeBox/CodeBox.jsx'
import { useNavigate } from 'react-router-dom'
import LargeTextTitle from '../../../components/LargeTextTitle/LargeTextTitle'

const apiCallObjs = [
    {
        language: "Bash",
        code:
            `curl -X POST "https://platform.keywordsai.co/api/generate/"\
-H "Content-Type: application/json"\
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}"\
-d '{
    "messages":[{
        "role":"user",
        "content":"Hello"
    }],
}'`
    },
    {
        language: "Python",
        code: `import requests
import json

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Api-Key {YOUR_ACCESS_TOKEN}',
}

data = {
    'messages': [{'role': 'user', 'content': 'Hello'}],
}

response = requests.post('https://platform.keywordsai.co/api/generate/', headers=headers, json=data)`
    },
    {
        language: "JavaScript",
        code: `fetch('https://platform.keywordsai.co/api/generate/', {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Api-Key {YOUR_ACCESS_TOKEN}',
},
body: JSON.stringify({
    messages: [{ role: 'user', content: 'Hello' }],
}),
})
.then(response => response.json())
.then(data => console.log(data));`
    },
    {
        language: "PHP",
        code: `<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://platform.keywordsai.co/api/generate/');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Authorization: Api-Key {YOUR_ACCESS_TOKEN}',
));
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
    "messages" => array(array("role" => "user", "content" => "Hello")),
)));

$response = curl_exec($ch);
curl_close($ch);
?>`
    },
    {
        language: "GoLang",
        code: `package main

import (
    "bytes"
    "net/http"
)

func main() {
    url := "https://platform.keywordsai.co/api/generate/"
    method := "POST"

    payload := []byte(\`{
        "messages": [{"role": "user", "content": "Hello"}],
    }\`)

    client := &http.Client{}
    req, err := http.NewRequest(method, url, bytes.NewBuffer(payload))

    if err != nil {
        panic(err)
    }
    req.Header.Add("Content-Type", "application/json")
    req.Header.Add("Authorization", "Api-Key {YOUR_ACCESS_TOKEN}")

    res, err := client.Do(req)
    defer res.Body.Close()
}`
    }
];

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

export default function Documentation() {
    const navigate = useNavigate();
    return (
        <div className="main-section-bottom bg-white"
        >
            <div className="max-width-container">
                <div className="flex-col main-center cross-center g-md stretch">
                    <h1 className="display-lg">API Documentation with Example Snippets</h1>
                </div>
                <LargeTextTitle
                    title="Setup"
                    subtitle={<span>
                        {"Our API endpoint is designed to offer functionality closely aligned with OpenAI's API. The following API call closely resembles a call to OpenAI's API."}
                        <span className="t-bold t-black">{" You can change your existing Open AI infrastructure to our API seamlessly without rewriting code."}</span>
                        {" Simply change the URL to https://platform.keywordsai.co/api/generate/."}
                    </span>}
                />

                <div className="flex-col cross-start g-sm stretch">
                    <div className="display-sm">Get API Key</div>
                    <span className="text-lg t-l t-gray4">
                        {"To use the API, replace"} <span className="t-black">{"{YOUR_ACCESS_TOKEN}"}</span> {"with your actual API key. The key is generated after you complete a payment. You can obtain your API keys "}<a href="https://platform.keywordsai.co/get-api-key" className="t-primary" target="blank" rel="noopener noreferrer">here</a>{"."}                </span>
                    <button className="button-primary"
                        onClick={() => {
                            navigate("/get-api-key");
                        }}
                    >
                        Retrieve API key
                        <Arrow />
                    </button>
                </div>
                <div className="flex-col cross-center g-lg stretch">
                    <div className="flex-col cross-start g-sm stretch">
                        <div className="display-sm">Example Usage</div>
                        <span className="text-lg t-l t-gray4">
                            {"You can include all input parameters in the request body, similar to how you would when interacting with the OpenAI API."}
                            <br />
                            <br />
                            {`For further reference on the OpenAI API, read `}<a target="blank" rel="noopener norefeerer" href="https://platform.openai.com/docs/api-reference" className="t-primary">{"here"}</a>{". "}
                        </span>
                    </div>
                    <CodeBox codeObjs={apiCallObjs} />
                </div>
                <div className="flex-col cross-center g-lg stretch">
                    <div className="flex-col cross-start g-sm stretch">
                        <div className="display-sm">Response Format</div>
                        <span className="text-lg t-gray4">
                            {`The response format is exactly that of the OpenAI API:`}
                        </span>
                    </div>
                    <CodeBox codeObjs={responseObjs} />
                </div>
                <div className="flex-col cross-start g-sm stretch">
                    <div className="display-sm">{"Rate Limit (Beta)"}</div>
                    <span className="text-lg t-l t-gray4">
                        {"We limit the calling rate to be 20 calls/min at the current version."}
                    </span>
                </div>
                <div className="flex-col cross-start g-sm stretch">
                    <div className="display-sm">{"Error Handling"}</div>
                    <span className="text-lg t-l t-gray4">
                        <span>
                            {"We return the exact error code OpenAI provides, check "}
                            <a className="text-lg t-primary"
                                style={{
                                    cursor: "pointer",
                                    textDecoration: "underline"
                                }}
                                onClick={() => {
                                    window.open("https://platform.openai.com/docs/guides/error-codes/error-codes", "_blank")
                                }}
                            >this</a>
                            {"."}
                        </span>
                        <br />
                        <br />
                        {"Reach out to team@keywordsai.co with any questions you have regarding this API documentation."}
                    </span>
                </div>
            </div>
        </div>
    )
}
