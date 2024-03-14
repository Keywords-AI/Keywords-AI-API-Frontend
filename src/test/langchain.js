import { ChatOpenAI as ChatOpenAITest } from "@langchain/openai"


const chat = new ChatOpenAITest({
    configuration: {
        baseURL: "https://api-test.keywordsai.co/api/",
        apiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7"
    },
    openAIApiKey: "DvAVh1YZ.HAJoxEesOEwNyAGi56fSMa4KEnZyEtP7",
    modelName: "gpt-3.5-turbo",
})

async function main() {
    const response = await chat.invoke("Hi")
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