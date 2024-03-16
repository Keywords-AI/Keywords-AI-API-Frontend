import { ChatOpenAI as ChatOpenAITest } from "@langchain/openai"
// import { ChatOpenAI } from "langchain/chat_models/openai"
import { ConversationChain } from "langchain/chains"


const keywordsAI =  new ChatOpenAITest({
    configuration: {
        baseURL: "https://api.keywordsai.co/api/",
    },
    openAIApiKey: "<En5XoPkf.kSEt4KS23UCjttnqhCzlN5tz5niou2H2>",
    modelName: "gpt-3.5-turbo",
    streaming: true,
    modelKwargs: {
        customer_identifier: "123456"
    }
    
})


const chain = new ConversationChain({
    llm: keywordsAI,
})

async function main() {
    // const response = await chain.call({input: "Hi"})
    const response = await keywordsAI.invoke("Hi")
    console.log(response)
}

main()

// import OpenAI from "openai";

// const openai = new OpenAI(
//     {
//         baseURL: "https://api-test.keywordsai.co/api/",
//         apiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7"
//     }
// );

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }

// main();