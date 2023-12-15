import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendStreamingText } from "src/store/thunks/streamingTextThunk";

const StreamingTextTest = () => {
  const dispatch = useDispatch();
  const { isLoading, error, streamingText } = useSelector(
    (state) => state.streamingText
  );
  const data = {
    messages: [
      { role: "system", content: "" },
      { role: "user", content: "american history" },
    ],
    stream: true,
    model: "gpt-3.5-turbo",
  };
  const handleSubmit = () => {
    dispatch(sendStreamingText(data));
  };

  return (
    <div>
      <div>
        <button onClick={handleSubmit} disabled={isLoading}>
          Start Streaming
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      <div>
        <h2>Streaming Text:</h2>
        <div>{streamingText && streamingText}</div>
      </div>
    </div>
  );
};

export default StreamingTextTest;
