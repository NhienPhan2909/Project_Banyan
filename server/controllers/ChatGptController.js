const unirest = require('unirest');

//Extracting the epics and user stories from GPT response. 
const extractEpicsAndStories = (responseText) => {
    const text = responseText
    const json = { epics: [] };
    let currentEpic = null;
    let currentStory = null;

    for (const line of text.split('\n')) {
        //Extract epics from response text
        if (line.startsWith('Epic ')) {
            const epicName = line.substring(8).trim();
            currentEpic = { name: epicName, stories: [] };
            json.epics.push(currentEpic);
        } 
        //Extract user stories and push to current epic story is within. 
        else if (line.startsWith('User Story ')) {
            const storyName = line.substring(14).trim();
            currentStory = { name: storyName };
            currentEpic.stories.push(currentStory);
        }
    }

    return json;
}

const projectPrompt = async (req, res, next) => {
    var prompt = `Think of yourself as a project manager. Break down the project of ${req.body.prompt} into agile epics.
    Some background information regarding the project: ${req.body.description}
    Each epic should be on their own line, in the format of "Epic n: *". 
    Then, break down each epic into user stories, each on their own line below their corresponding epic,
    in the format of "User Story n: As a *, I want to be able to *."`

    //Sending a request to OpenAI API with given prompt to generate project. 
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
            const completedText = response.raw_body;
            const jsonObj = JSON.parse(completedText);
            finalText = jsonObj.choices[0].text;
            //Send response with epics and user stories
            return res.status(200).json(extractEpicsAndStories(finalText));
        });
}

const extractExpandedNode = (responseText, agileType) => {
    var childType;
    //Create child type of task unless parent is epic. 
    agileType == "epic" ? childType = "story" : childType = "task"; 

    const text = responseText;
    const json = { children: [] };

    //Extract the child from response text. 
    text.split('\n').forEach(line => {
        line = line.trim();
        const childContent = line.substring(3).trim();
        const currentChild = {
            attributes: {
                type: childType,
                prompt: childContent
            },
            children: []
        }
        json.children.push(currentChild);
    });

    return json;
}

const expandNode = async (req, res, next) => {
    var projectPrompt = req.body.projectPrompt;
    var agileType = req.body.agileType;
    var parentNodePrompt = req.body.parentNodePrompt;
    var prompt;
    
    //Change prompt depending on type of agile card being expanded. 
    switch (agileType) {
        case "epic":
            prompt = `Think of yourself as a project manager. Using the Agile methodology, break down the agile epic: "${parentNodePrompt}"
            for the project of "${projectPrompt}" into 2-4 relevant user stories. 
            Each story should be written as "As a *, I want to be able to *."`;
            break;
        case "story":
            prompt = `Think of yourself as an expert in the field. Using the Agile methodology, break down the user story: "${parentNodePrompt}"
            for the project of "${projectPrompt}" into 3-5 achievable tasks. 
            Do not include any tasks involving deploying, integrating, testing, or documentation. 
            Each task should be written as a direction. 
            If the task requires software development or programming, include recommended tech stacks as (Recommended stacks: *, *, *).
            Otherwise, include any recommendations as (Recommended departments: *, *, *).`;
            break;
        case "task":
            prompt = `Think of yourself as an expert in the field. Using the Agile methodology, break down the task: "${parentNodePrompt}"
            for the project of "${projectPrompt}" into up to 6 subtasks such that each is achievable by a single developer.
            Do not include any tasks involving deploying, integrating, testing, or documentation.`;
            break;
        default:
            prompt = `Think of yourself as a project manager. Using the Agile methodology, break down the goal of: "${parentNodePrompt}"
            for the project of "${projectPrompt}" into more granular and detailed goals.`;
    }
    prompt += " Write the result as a numbered list, in the form of (1. *, 2. *).";

    //Send request to chatGPT for expansion. 
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
            const completedText = response.raw_body;
            const jsonObj = JSON.parse(completedText);
            finalText = jsonObj.choices[0].text.trim();
            return res.status(200).json(extractExpandedNode(finalText, agileType));
        });
}

module.exports = {
    projectPrompt, expandNode
}
