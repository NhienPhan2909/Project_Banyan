import React, { Component } from 'react';
import './prompt.css';
import {TextField} from '@mui/material/';
// import Box from '@mui/material/Box';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';

class Prompt extends Component {
    state = {
        prompt: null
    };

    // Use ChatGPT API
    createProject = async (prompt) => {
        const chatGptResponse = await axios.post('http://localhost:11000/chatgpt/start-project', {
            prompt
        });

        // For each epic from the ChatGPT response, save its stories as nodes in the database, retrieving their IDs.
        // Then, save the epic as another node that includes the list of story IDs, then retrieve its ID.
        const epic_ids = await Promise.all(chatGptResponse.data.epics.map(async (epic) => {
            const epicResponse = await axios.post('http://localhost:11000/nodes/add-node', {
                content: epic.name,
                agile_scope: "epic",
                _childIdList: await Promise.all(epic.stories.map(async (story) => {
                    const storyResponse = await axios.post('http://localhost:11000/nodes/add-node', {
                        content: story.name,
                        agile_scope: "story"
                    });
                    return storyResponse.data.result._id;
                }))
            });
            return epicResponse.data.result._id;
        }));

        // Finally, save the initiative (prompt) as the root node that includes the list of epic IDs,
        // then save a project attached to the user that points to the initiative ID.
        const rootResponse = await axios.post('http://localhost:11000/nodes/add-node', {
            content: prompt,
            agile_scope: "initiative",
            _childIdList: epic_ids
        });

        const token = localStorage.getItem('jwtToken');
        const projectResponse = await axios.post('http://localhost:11000/projects/add-project', {
            _rootId: rootResponse.data.result._id,
            name: prompt, // need to add separate text input for the project name and route it here
            token: token
        })

        if (projectResponse.status === 200) {
            window.location.href = '/dashboard';
        }

        return projectResponse.status;
    }

    render() {
        return (
            <div className="PromptContent">
                <h1 className="PromptTitle">Enter your Project Proposal</h1>
                <div className="PromptFormContainer">
                <div className="PromptForm">
                    <TextField fullWidth sx={{ input: {textAlign:"center", color: "black", fontSize: '20px' } }} id="input-with-username" label="" variant="standard" size='large'
                    InputLabelProps={{
                        InputLabelProps: {
                            style: { textAlign:'center', color: "lightgrey", maxHeight: '100px', minHeight: '100px'},
                        },
                        style: { textAlign:'center', color: "lightgrey" },
                    }}
                    onChange={
                        x => {
                            this.setState({ prompt: x.target.value });
                        }
                    }
                    />
                </div>
                <div>
                <Stack className="continue">
                    <Button style = {{maxWidth: '90px', maxHeight: '45px', minWidth: '90px', minHeight: '45px'}} variant="contained"   
                        onClick={() => {
                            this.createProject(this.state.prompt);
                        }
                    }>Continue
                    </Button>
                </Stack>
                </div>
                </div>
            </div>
        );
    }
}

export default Prompt;
