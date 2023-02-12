import React, { Component } from 'react';
import './prompt.css';
import {TextField} from '@mui/material/';
// import Box from '@mui/material/Box';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

class Prompt extends Component {
    state = {
        prompt: null
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/prompt');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };

    render() {
        return (
            <div className="PromptContent">
                <h1 className="PromptTitle">Enter your Project Proposal</h1>
                <div className="PromptFormContainer">
                <div className="PromptForm">
                    <TextField fullWidth sx={{ input: {textAlign:"center", color: "black", fontSize: '30px' } }} id="input-with-username" label="" variant="standard" size='large'
                    InputLabelProps={{
                        InputLabelProps: {
                            style: { textAlign:'center', color: "lightgrey", maxHeight: '100px', minHeight: '100px'},
                        },
                        style: { textAlign:'center', color: "lightgrey" },
                    }}
                    onChange={
                        x => {
                            this.state.prompt = x.target.value;
                        }
                    }
                    />
                </div>
                <div>
                <Stack className="continue">
                    <Button style = {{maxWidth: '90px', maxHeight: '45px', minWidth: '90px', minHeight: '45px'}} variant="contained"   
                        onClick={() => {
                            alert(this.state.prompt);
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
