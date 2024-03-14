import { ChatOpenAI as ChatOpenAITest } from "@langchain/openai"
// import { ChatOpenAI } from "langchain/chat_models/openai"
import { ConversationChain } from "langchain/chains"

// const chat = new ChatOpenAITest({
//     configuration: {
//         baseURL: "https://api-test.keywordsai.co/api/",
//         apiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7"
//     },
//     openAIApiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7",
//     modelName: "gpt-3.5-turbo",
// })

// async function main() {
//     const response = await chat.invoke("Hi")
//     console.log(response)
// }

// main()

const socketAiModelTest = (socket, event, model) => {
    const keywordsAI =  new ChatOpenAITest({
        configuration: {
            baseURL: "https://api-test.keywordsai.co/api/",
            apiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7"
        },
        openAIApiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7",
        modelName: model || modelName,
        streaming: true,
        callbacks: [
        //   {
        //     handleLLMNewToken(token) {
        //       socket.emit(`${event} start`, token);
        //     }
        //   }
        ]
    })
    return keywordsAI;
}

const keywordsAI =  new ChatOpenAITest({
    configuration: {
        baseURL: "https://api-test.keywordsai.co/api/",
        apiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7"
    },
    openAIApiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7",
    modelName: "gpt-3.5-turbo" || modelName,
    streaming: true,
    callbacks: [
    //   {
    //     handleLLMNewToken(token) {
    //       socket.emit(`${event} start`, token);
    //     }
    //   }
    ]
})


const chain = new ConversationChain({
    llm: keywordsAI,
})

async function main() {
    const response = await chain.call({input: "Hi"})
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