const { Configuration, OpenAIApi } = require("openai");

function extractEpicsAndStories(responseText) {
    const text = responseText
    const json = { epics: [] };
    let currentEpic = null;
    let currentStory = null;

    for (const line of text.split('\n')) {
        if (line.startsWith('Epic ')) {
            const epicName = line.substring(8).trim();
            currentEpic = { name: epicName, stories: [] };
            json.epics.push(currentEpic);
        } else if (line.startsWith('User Story ')) {
            const storyName = line.substring(14).trim();
            currentStory = { name: storyName };
            currentEpic.stories.push(currentStory);
        }
    }

    return json;
}

const projectPrompt = async (req, res, next) => {
    //request.body.prompt should just be the essence of the project
    var prompt = "Think yourself as a Project Manager. Break down the project of "
        + req.body.prompt + " into agile epics. And break down each epic into user stories";

    var unirest = require('unirest');
    var req = unirest('POST', 'https://api.openai.com/v1/completions')
        .headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        })
        .send(JSON.stringify({
            "model": "text-davinci-003",
            "prompt": prompt,
            "max_tokens": 3600,
            "temperature": 0
        }))
        .end(function (response) {
            if (response.error) throw new Error(response.error);
            console.log("response..........", response)
            const completedText = response.raw_body;
            console.log(typeof completedText)
            const jsonObj = JSON.parse(completedText);
            console.log(jsonObj)
            console.log(jsonObj.choices)
            finalText = jsonObj.choices[0].text
            console.log("JSON TEXT.............", finalText)
            return res.status(200).json(extractEpicsAndStories(finalText));
        })
}


const expandNode = async (req, res, next) => {

    const configuration = new Configuration({
        apiKey: "API_KEY",
    });

    const openai = new OpenAIApi(configuration);

    var projectPrompt = req.body.projectPrompt
    var agileType = req.body.agileType
    var parentNodePrompt = req.body.parentNodePrompt
    var prompt;

    if (agileType == "Epic") {
        prompt = "Think yourself as a project manager. For a agile sprint, break down the agile epic: \""
            + parentNodePrompt + "\" for project of " + projectPrompt + " into user stories. Feel free to break the user story into agile cards further"
    }
    else if (agileType == "User Story") {
        prompt = "Think yourself as a software engineer. For a agile sprint, break down the user story: \""
            + parentNodePrompt + "\" for project of " + projectPrompt + " into achievable agile cards. Break the agile cards further"
    }

    else if (agileType == "Agile Card") {
        prompt = "Think yourself as a software engineer. For a agile sprint, break down the agile card: \""
            + parentNodePrompt + "\" for project of " + projectPrompt + " into further achievable agile cards. Feel free to break the agile cards further"
    }

    var unirest = require('unirest');
    var req = unirest('POST', 'https://api.openai.com/v1/completions')
        .headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <API_KEY>'
        })
        .send(JSON.stringify({
            "model": "text-davinci-003",
            "prompt": prompt,
            "max_tokens": 3600,
            "temperature": 0
        }))
        .end(function (response) {
            if (response.error) throw new Error(response.error);
            console.log("response..........", response)
            const completedText = response.raw_body;
            console.log(typeof completedText)
            const jsonObj = JSON.parse(completedText);
            console.log(jsonObj)
            console.log(jsonObj.choices)
            finalText = jsonObj.choices[0].text
            console.log("JSON TEXT.............", finalText)
            return res.status(200).send(finalText)
        })


    return res.status(200).send(finalText)
};

module.exports = {
    projectPrompt, expandNode
}
