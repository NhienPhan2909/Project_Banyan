const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "API_KEY",
});
const openai = new OpenAIApi(configuration);

prompt = "Think yourself as a Project Manager. Break down the task of Define shopping cart design guidelines for project of design of e-commerce website into further tasks\n\n\n1. Define the purpose and objective of the shopping cart design.\n2. Identify the desired user experience.\n3. Research existing shopping cart design guidelines.\n4. Analyze customer needs and preferences.\n5. Design a layout for the shopping cart that meets user needs.\n6. Set up a testing process to measure customer satisfaction with the design.\n7. Develop a list of rules and guidelines for design elements and functionality.\n8. Document the design and guidelines for future reference.\n9. Implement the shopping cart design guidelines into the project. Monitor and evaluate the design's performance."

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "",
  temperature: 0.7,
  max_tokens: 1791,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

console.log(response)