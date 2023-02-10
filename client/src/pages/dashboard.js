import { Box } from '@mui/material';
import React, { Component } from 'react';
import './dashboard.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

class Dashboard extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/dashboard');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };

    render() {
        return (
            (
                <div className="dash-container">
                  <div className="dash-form">
                      <h3 className="dash-form-title" >My Projects</h3>
                      <Box display='flex' justifyContent = 'left' paddingLeft='50px' paddingRight='50px'>
                    <Stack className="NewProjButton">
                    <Button style = {{fontSize:'40px', maxWidth: '200px', maxHeight: '200px', minWidth: '200px', minHeight: '200px'}} variant='outlined'   
                        onClick={() => {
                            alert(this.state.prompt);
                        }
                    }>+
                    </Button>
                </Stack>
                  </Box>
                  </div>
                </div>
              )
        );
    }
}

export default Dashboard;
