import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box, Stack } from '@mui/material/';
import axios from 'axios';
import FadeLoader from "react-spinners/FadeLoader";
import './prompt.css';

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
        if (!prompt || !description) {
            window.alert("Please enter your prompt and description for the project");
        }
        else {
            this.setState({ loading: true }); // set loading state to true before API call   

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
                name: prompt,
                content: description,
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
                <FadeLoader className='spinner' loading={this.state.loading} size={30} color={'rgb(0, 105, 62)'} />
                <div className="prompt-container">
                    <form className="promptForm">
                        <Button className='cancel' sx={{ color: 'rgb(0, 105, 62)' }} style={{ backgroundColor: 'white', maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px', fontSize: '18px' }} variant="none"
                            onClick={() => {
                                window.location.href = '/dashboard'
                            }}
                        ></Button>
                        <div className='logo'>
                            <Link id='dashboard' to="/dashboard">
                                <img id='logo' src="BanyanText_Transparent.png" />
                            </Link>
                        </div>
                        <div className="Prompt-form-content">
                            <div className="inputs">
                                <p className="prompt-label">1. Project Title</p>
                                <Box textAlign={'center'} paddingBottom={'40px'}>
                                    <TextField
                                        sx={{ input: { color: 'black' }, width: '300px' }}
                                        label="E.g. Ecommerce Website"
                                        variant="standard"
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
                                <p className="prompt-label">2. Project Description</p>
                                <Box textAlign={'center'}>
                                    <TextField variant={'outlined'} multiline rows={5} maxRows={8} sx={{ input: { color: 'black' }, width: '300px' }} label="What does your project entail?"
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
                                    <Button style={{ backgroundColor: 'rgb(0, 105, 62)', maxWidth: '90px', maxHeight: '45px', minWidth: '90px', minHeight: '45px' }} variant="contained"
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
