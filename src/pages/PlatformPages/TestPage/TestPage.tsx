import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Button, User } from "src/components";
import { keywordsStream } from "src/utilities/requests";
import { PRODUCTION_TEST_KEY, LOCAL_TEST_KEY } from "src/env";
import { models } from "src/components/Misc";
import { PageContent } from "src/components/Sections";
import { useTypedDispatch } from "src/store/store";

const StreamingTextTest = () => {
  const dispatch = useTypedDispatch();
  const [streamingText, setStreamingText] = useState("");
  const readStream = (chunk: string) => {
    try {
      const message = JSON.parse(chunk);
      const text = message.choices?.[0].delta.content;
      if (text) setStreamingText((prev)=>prev + chunk);
      if (message.finish_reason === "stop") {
        console.log("logprobs")
        console.log("streaming finished");
      }
    } catch (e) {
      // console.log("error", e);
    }
  };
  const openAIModels = models.filter((model) => model.name.includes("OpenAI"));
  const streamingParams = {
    apiKey: LOCAL_TEST_KEY,
    data: {
      messages: [{ content: "Hello", role: "user" }],
      stream: true,
      model: "gpt-3.5-turbo",
      logprobs: true,
    },
    dispatch,
    callbackFunction: (chunk: string) => readStream(chunk),
  };
  return (
    <PageContent title={"Streaming Text Test"}>
      <Button
        variant="r4-primary"
        text="Send Stream"
        onClick={(e) => {
          keywordsStream(streamingParams);
        }}
      />
      <div className="flex-col bg-red-500 text-gray-4 text-sm gap-sm items-start self-stretch">
        {streamingText}
      </div>
      <Button
        variant="r4-primary"
        text="Clear Text"
        onClick={(e) => {
          setStreamingText("");
        }}
      />
    </PageContent>
  );
};

export default StreamingTextTest;
