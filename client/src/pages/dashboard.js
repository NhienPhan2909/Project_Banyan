import { Box } from '@mui/material';
import React, { Component } from 'react';
import './dashboard.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import AccountCircle from '@mui/icons-material/AccountCircle';


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
                    <div className='dashHeader'>
                      <h3>My Projects</h3>
                      <Stack className='projects' direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} display='flex'>
                      <Button style = {{maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}} 
                        onClick={() => {
                            alert("Hi");
                        }
                         }><AccountCircle sx={{color:'black', fontSize:'50px'}}/>
                        </Button>
                    </Stack>
                    </div>
                      <div className='startDoc'>Start a new Project</div>
                      <Box display='flex' paddingLeft='50px' paddingRight='50px'>
                    <Stack  direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                    <Button className="NewProjButton" paddingRight='20px' style = {{fontSize:'60px',  maxWidth: '150px', maxHeight: '200px', minWidth: '150px', minHeight: '200px'}} variant='outlined'   
                        onClick={() => {
                            alert("Hi");
                        }
                    }>+
                    </Button>
                    <Button paddingRight='20px' sx={{backgroundColor: '#fffbe8'}}  style = {{fontSize:'24px', color:'black', maxWidth: '150px', maxHeight: '200px', minWidth: '150px', minHeight: '200px'}} variant='outlined'   
                        onClick={() => {
                            alert("Hi");
                        }
                    }>Project1
                    </Button>
                    <Button paddingRight='20px' sx={{backgroundColor: '#fffbe8'}}  style = {{fontSize:'24px', color:'black', maxWidth: '150px', maxHeight: '200px', minWidth: '150px', minHeight: '200px'}} variant='outlined'   
                        onClick={() => {
                            alert("Hi");
                        }
                    }>Project2
                    </Button>
                    <Button paddingRight='20px' sx={{backgroundColor: '#fffbe8'}}  style = {{fontSize:'24px', color:'black', maxWidth: '150px', maxHeight: '200px', minWidth: '150px', minHeight: '200px'}} variant='outlined'   
                        onClick={() => {
                            alert("Hi");
                        }
                    }>Project3
                    </Button>
                    <Button paddingRight='20px' sx={{backgroundColor: '#fffbe8'}}  style = {{fontSize:'24px', color:'black', maxWidth: '150px', maxHeight: '200px', minWidth: '150px', minHeight: '200px'}} variant='outlined'   
                        onClick={() => {
                            alert("Hi");
                        }
                    }>Project4
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
