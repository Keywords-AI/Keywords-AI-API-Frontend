import React from "react";
import CodeBox from "src/components/CodeBox/CodeBox";

const apiCallObjs = [
  {
    language: "Bash",
    code: `curl -X POST "https://platform.keywordsai.co/api/generate/"\
-H "Content-Type: application/json"\
-H "Authorization: Api-Key {YOUR_ACCESS_TOKEN}"\
-d '{
    "messages":[{
        "role":"user",
        "content":"Hello"
    }],
    "stream": false,
    "max_tokens": 100,
    ... other parameters in similar format ...

}'`,
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
    'stream': false,
    'max_tokens': 100,
    ... other parameters in similar format ...
}

response = requests.post('https://platform.keywordsai.co/api/generate/', headers=headers, json=data)`,
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
    'stream': false,
    'max_tokens': 100,
    ... other parameters in similar format ...
}),
})
.then(response => response.json())
.then(data => console.log(data));`,
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
    "stream" => false,
    "max_tokens" => 100,
    ... other parameters in similar format ...
)));

$response = curl_exec($ch);
curl_close($ch);
?>`,
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
        "stream": false,
        "max_tokens": 100,
        ... other parameters in similar format ...
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
}`,
  },
];

const parameters = [
  "prompt -- List of messages, or string, to send to GPT",
  "suffix -- String to append to GPT response",
  "max_tokens -- integer or null",
  "temperature -- number or null",
  "n -- integer or null, How many completions to generate for each prompt.",
  "stream -- boolean, Whether to stream back partial progress.",
  "logprobs -- integer or null, Include the log probabilities on the logprobs most likely tokens, as well the chosen tokens.",
  "echo -- boolean, Echo back the prompt in addition to the completion",
  "stop -- List of string, Stop sequence",
  `presence_penalty -- number or null, How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics.`,
  `frequency_penalty -- number or null, How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.`,
  `best_of -- integer or null, Generates best_of completions server side and returns the "best" (the one with the lowest log probability per token). Results cannot be streamed.`,
  "logit_bias -- Map of tokens to logit bias values",
];

export function RequestParagraph() {
  return (
    <div className="flex-col items-start gap-lg self-stretch">
      <div className="flex-col items-start gap-sm self-stretch">
        <span>
          {
            "You can paste the command below into your terminal to run your first API request. Make sure to replace"
          }
          <strong>{" {YOUR_ACCESS_TOKEN} "}</strong>
          {"with your secret API key."}
          <br />
          {/* {`For further reference on the OpenAI API, read `}
                    <a target="blank" rel="noopener norefeerer" href="https://platform.openai.com/docs/api-reference" className="text-primary">{"here"}</a>{". "} */}
        </span>
      </div>
      <CodeBox codeObjs={apiCallObjs} />
      <span>
        <strong>Parameters</strong>
        <br />
        <br />
        <li>
          <strong>messages: </strong>List of messages, or string, to send to GPT
        </li>
        <li>
          <strong>suffix: </strong>String to append to GPT response
        </li>
        <li>
          <strong>max_tokens: </strong>integer or null
        </li>
        <li>
          <strong>temperature: </strong>number or null
        </li>
        <li>
          <strong>n: </strong>integer or null, How many completions to generate
          for each prompt.
        </li>
        <li>
          <strong>stream: </strong>boolean, Whether to stream back partial
          progress.
        </li>
        <li>
          <strong>logprobs: </strong>integer or null, Include the log
          probabilities on the logprobs most likely tokens, as well the chosen
          tokens.
        </li>
        <li>
          <strong>echo: </strong>boolean, Echo back the prompt in addition to
          the completion
        </li>
        <li>
          <strong>stop: </strong>List of string, Stop sequence
        </li>
        <li>
          <strong>presence_penalty: </strong>number or null, How much to
          penalize new tokens based on whether they appear in the text so far.
          Increases the model's likelihood to talk about new topics.
        </li>
        <li>
          <strong>frequency_penalty: </strong>number or null, How much to
          penalize new tokens based on their existing frequency in the text so
          far. Decreases the model's likelihood to repeat the same line
          verbatim.
        </li>
        <li>
          <strong>best_of: </strong>integer or null, Generates best_of
          completions server side and returns the "best" (the one with the
          lowest log probability per token). Results cannot be streamed.
        </li>
        <li>
          <strong>logit_bias: </strong>Map of tokens to logit bias values
        </li>
      </span>
    </div>
  );
}

export function ParametersParagraph() {
  return (
    <>
      <span>
        {parameters.map((parameter, index) => {
          return (
            <>
              <span key={index}>{parameter}</span>
              <br />
            </>
          );
        })}
      </span>
    </>
  );
}
