const readStream = async (
  streamResponse,
  callbackFunction,
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
