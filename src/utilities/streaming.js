
export const parseChunk = (chunk) => {
    // This funciton is compatible with redux dispatch
    // Text is the JSON string that contains the chunk in the OpenAI style.
    try {
      const contentChunk = JSON.parse(chunk);
      const content = contentChunk.choices[0].delta.content;
      if (content && content !== undefined) {
        return content;
      } else {
        return "";
      }
    } catch (error) {
        return "";
    }
  };