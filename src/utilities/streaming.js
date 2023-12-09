
export const parseChunk = (chunk) => {
    // This funciton is compatible with redux dispatch
    // Text is the JSON string that contains the chunk in the OpenAI style.
    try {
      const contentChunk = JSON.parse(text);
      const content = contentChunk.choices[0].delta.content;
      return content
    } catch (error) {
      // Handle JSON parsing error here
      return "[JSON ERROR]"
    }
  };