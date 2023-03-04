const configuration = new Configuration({
    apiKey: "API_KEY",
  });

const openai = new OpenAIApi(configuration);

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


const projectPrompt = async (req, res, next) => {
    //request.body.prompt should just be the essence of the project
    var prompt = "Think yourself as a Project Manager. Break down the project of" 
    + req.body.prompt + "into agile epics. And break down each epic into user stories"


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

const expandNode  = async (req, res, next) => {
    var projectPrompt = req.body.projectPrompt
    var agileType = req.body.agileType
    var parentNodePrompt = req.body.parentNodePrompt
    var prompt;
    
    if(agileType == "Epic"){
        prompt = "Think yourself as a project manager. For a agile sprint, break down the agile epic: \"" 
        + parentNodePrompt + "\" for project of " + projectPrompt + " into user stories. Feel free to break the user story into agile cards further"
    }
    else if(agileType == "User Story"){
        prompt = "Think yourself as a software engineer. For a agile sprint, break down the user story: \"" 
        + parentNodePrompt + "\" for project of " + projectPrompt + " into achievable agile cards. Feel free to break the agile cards further"
    }

    else if(agileType == "Agile Card"){
        prompt = "Think yourself as a software engineer. For a agile sprint, break down the agile card: \"" 
        + parentNodePrompt + "\" for project of " + projectPrompt + " into further achievable agile cards. Feel free to break the agile cards further"
    }
    
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
