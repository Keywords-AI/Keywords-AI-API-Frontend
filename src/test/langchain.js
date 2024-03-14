import { ChatOpenAI } from "@langchain/openai"


const chat = new ChatOpenAI({
    configuration: {
        baseURL: "https://api-test.keywordai.co/api/",
        apiKey: ""
    }
})

console.log(chat)