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

    const jsonText = extractEpicsAndStories(completedText)

    return res.status(200).send(jsonText)
};

function extractEpicsAndStories (responseText) {
    const text = responseText
    const json = { epics: [] };
    let currentEpic = null;
    let currentStory = null;

    for (const line of text.split('\n')) {
    if (line.startsWith('Epic ')) {
        const epicName = line.substring(6).trim();
        currentEpic = { name: epicName, stories: [] };
        json.epics.push(currentEpic);
    } else if (line.startsWith('User Story ')) {
        const storyName = line.substring(11).trim();
        currentStory = { name: storyName };
        currentEpic.stories.push(currentStory);
    }
    }
    json = JSON.stringify(json, null, 2)
    console.log(json);
    return json
}
