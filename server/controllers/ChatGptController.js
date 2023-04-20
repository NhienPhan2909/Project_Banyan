const unirest = require('unirest');

const extractEpicsAndStories = (responseText) => {
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
    var prompt = "Think yourself as a Project Manager. Break down the project of "
        + req.body.prompt + " into agile epics. And break down each epic into user stories. Some background information regarding the project: " + req.body.description;

    var req = unirest('POST', 'https://api.openai.com/v1/completions')
        .headers({
            'Content-Type': 'application/json',
            'Authorization': process.env.OpenAI_API
        })
        .send(JSON.stringify({
            "model": "text-davinci-003",
            "prompt": prompt,
            "max_tokens": 3600,
            "temperature": 0
        }))
        .end(function (response) {
            if (response.error) throw new Error(response.error);
            console.log("response..........", response);
            const completedText = response.raw_body;
            console.log(typeof completedText);
            const jsonObj = JSON.parse(completedText);
            console.log(jsonObj);
            console.log(jsonObj.choices);
            finalText = jsonObj.choices[0].text;
            console.log("JSON TEXT.............", finalText);
            return res.status(200).json(extractEpicsAndStories(finalText));
        });
}

const extractExpandedNode = (responseText, agileType) => {
    var childType;
    switch (agileType) {
        case "epic":
            childType = "story";
            break;
        case "story":
        case "task":
        default:
            childType = "task";
    }

    const text = responseText;
    const json = { children: [] };

    for (const line of text.split('\n')) {
        const childName = childType.charAt(0).toUpperCase() + childType.slice(1) + " " + line.charAt(0); // e.g. Story 3
        const childContent = line.substring(3).trim();
        const currentChild = {
            name: childName,
            attributes: {
                type: childType,
                prompt: childContent
            },
            children: []
        }
        json.children.push(currentChild);
    }

    return json;
}

const expandNode = async (req, res, next) => {
    var projectPrompt = req.body.projectPrompt;
    var agileType = req.body.type;
    var parentNodePrompt = req.body.prompt;
    var prompt;

    switch (agileType) {
        case "epic":
            prompt = "Think yourself as a project manager. Using the Agile methodology, break down the agile epic: \""
                + parentNodePrompt + "\" for the project of \"" + projectPrompt + "\" into 2-4 relevant user stories.";
            break;
        case "story":
            prompt = "Think yourself as a software engineer. Using the Agile methodology, break down the user story: \""
                + parentNodePrompt + "\" for the project of \"" + projectPrompt + "\" into 3-5 achievable tasks. Do not include any tasks involving "
                + "deploying to production. Include recommended tech stacks for each task, in the form of (Recommended stacks: *, *, *).";
            break;
        case "task":
            prompt = "Think yourself as a software engineer. Using the Agile methodology, break down the task: \""
                + parentNodePrompt + "\" for the project of \"" + projectPrompt + "\" into subtasks such that each is achievable by a single developer. "
                + "Do not include any tasks involving deploying to production.";
            break;
        default:
            prompt = "Think yourself as a project manager. Using the Agile methodology, break down the goal of: \""
                + parentNodePrompt + "\" for the project of \"" + projectPrompt + "\" into more granular and detailed goals.";
    }

    var req = unirest('POST', 'https://api.openai.com/v1/completions')
        .headers({
            'Content-Type': 'application/json',
            'Authorization': process.env.OpenAI_API
        })
        .send(JSON.stringify({
            "model": "text-davinci-003",
            "prompt": prompt,
            "max_tokens": 3600,
            "temperature": 0
        }))
        .end(function (response) {
            if (response.error) throw new Error(response.error);
            console.log("response..........", response);
            const completedText = response.raw_body;
            console.log(typeof completedText);
            const jsonObj = JSON.parse(completedText);
            console.log(jsonObj);
            console.log(jsonObj.choices);
            finalText = jsonObj.choices[0].text;
            console.log("JSON TEXT.............", finalText);
            return res.status(200).json(extractExpandedNode(finalText));
        });
}

module.exports = {
    projectPrompt, expandNode
}
