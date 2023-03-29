import React, { Component } from 'react';
import './prompt.css';
import {TextField} from '@mui/material/';
// import Box from '@mui/material/Box';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { fontSize } from '@mui/system';

class Prompt extends Component {
    state = {
        prompt: null, 
        description: null,
        loading: false
    };

    // Define a method that sends a request to ChatGPT API
    // and saves the response to the database
    createProject = async (prompt, description) => {
        // Check if there is a prompt
        if (prompt === null) {
            window.alert("Please enter your prompt for the project");
        }
        else {
            this.setState({ loading: true }); // set loading state to true before API call   
        
            // If the project description is null
            if (description === null) {
                window.confirm("Your project description is empty. Please click OK if you are sure to continue.");
            }
            // Send a request to ChatGPT API to start a new project and get the response
            const chatGptResponse = await axios.post('http://localhost:11000/chatgpt/start-project', {
                prompt, 
                description
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

            // If the project is successfully added, send the user to the project tree
            // TODO: Status message to user
            if (projectResponse.status === 200) {
                window.location.href = '/tree/' + projectResponse.data.result._id;
                this.setState({ loading: false });
            } else {
                window.location.href = '/dashboard'
                this.setState({ loading: false });
            }

            return projectResponse.status;
        }
    }

    render() {
        return (
            <div>
                {this.state.loading && <div>Loading...</div>}
                <div className="prompt-container">
                    <form className="promptForm">
                    <Button className='cancel' sx={{color: 'rgb(0, 105, 62)'}} style={{backgroundColor: 'white', maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px', fontSize:'18px'}} variant="none"
                                        onClick={() => {
                                            window.location.href = '/dashboard'
                                        }}
                                    >x
                        </Button>
                        <div className='logo'>
                            <img id='logo' src="BanyanText_Transparent.png"/>
                        </div>
                        <div className="Prompt-form-content">
                            <div className="inputs">
                            <Box color={'rgb(0, 105, 62)'} fontWeight='425' paddingLeft={'50px'}  fontSize={'20px'} box={{display: 'flex', alignItems: 'flex-end', color: 'white' }}>1. Project Title</Box>
                                    <Box textAlign={'center'} paddingBottom={'40px'} box={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>
                                        <TextField sx={{ input: { color: 'black' }, width: '300px' }} label="E.g. Ecommerce Website" variant="standard"
                                            InputLabelProps={{
                                                style: { color: "lightgrey" },
                                            }}
                                            onChange={
                                                x => {
                                                    this.setState({ prompt: x.target.value });
                                                }
                                            }
                                        />
                                    </Box>
                                    <Box color={'rgb(0, 105, 62)'} fontWeight='425' paddingLeft={'50px'}  paddingBottom={'20px'} fontSize={'20px'} text-align={'left'} justifyContent={'left'} box={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>2. Project Description</Box>
                                    <Box textAlign={'center'} box={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>
                                        <TextField variant={'outlined'}  multiline rows={5} maxRows={8} sx={{ input: { color: 'black' }, width: '300px' }} label="What does your project entail?" 
                                            InputLabelProps={{
                                                style: { color: "lightgrey" },
                                            }}
                                            onChange={
                                                x => {
                                                    this.setState({ description: x.target.value });
                                                }
                                            }
                                        />
                                    </Box>
                            </div>
                            <div className="promptSubmit">
                                <Stack paddingBottom={'10px'} spacing={2}>
                                    <Button style={{backgroundColor:  'rgb(0, 105, 62)', maxWidth: '90px', maxHeight: '45px', minWidth: '90px', minHeight: '45px' }} variant="contained"
                                        onClick={async () => {
                                            this.createProject(this.state.prompt, this.state.description);
                                        }}
                                    >Continue
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Prompt;
