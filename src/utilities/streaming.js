
export const parseChunk = (chunk) => {
    // This funciton is compatible with redux dispatch
    // Text is the JSON string that contains the chunk in the OpenAI style.
    try {
      const contentChunk = JSON.parse(chunk);
      const content = contentChunk.evaluation? JSON.stringify(contentChunk.evaluation):contentChunk.choices[0].delta.content;
      // evaluation is the last chunk of the stream after the content
      if (chunk.evaluation) {
        console.log("evaluation", content);
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