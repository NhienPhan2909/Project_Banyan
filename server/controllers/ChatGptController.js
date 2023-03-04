const configuration = new Configuration({
    apiKey: "API_KEY",
  });

const openai = new OpenAIApi(configuration);

const projectPrompt = async (req, res, next) => {
    var prompt = req.body.prompt   

    // {
    //     "id": "<COMPLETION ID>",
    //     "model": "<MODEL NAME>",
    //     "created": <TIMESTAMP>,
    //     "choices": [
    //         {
    //             "text": "<COMPLETED TEXT>",
    //             "index": 0,
    //             "logprobs": null,
    //             "finish_reason": "<REASON FOR FINISHING>",
    //             "prompt": "<PROMPT>"
    //         }
    //     ]
    // }

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1791,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const completedText = response.choices[0].text;

    const text = extractEpicsAndStories(completedText)

    return res.status(200).send(text);
};
