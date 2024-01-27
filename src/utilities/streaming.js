import { setOutputs } from "src/store/actions/playgroundAction";
export const parseChunk = (chunk, dispatch) => {
  // This funciton is compatible with redux dispatch
  // Text is the JSON string that contains the chunk in the OpenAI style.
  try {
    console.log(chunk);
    const contentChunk = JSON.parse(chunk);
    const content = contentChunk.evaluation
      ? JSON.stringify(contentChunk.evaluation)
      : contentChunk.choices[0].delta.content;
    // evaluation is the last chunk of the stream after the content
    if (contentChunk.evaluation) {
      const outputs = JSON.parse(content);
      dispatch(
        setOutputs({
          score: outputs.scores,
          cost: outputs.cost,
          latency: outputs.latency,
          tokens: outputs.completion_tokens,
        })
      );
      return "";
    }
    if (content && content !== undefined) {
      return content;
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
