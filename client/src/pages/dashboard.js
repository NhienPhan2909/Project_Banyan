import { Box } from '@mui/material';
import React, { Component } from 'react';
import './dashboard.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import AccountCircle from '@mui/icons-material/AccountCircle';


class Dashboard extends Component {
    state = {
        data: null, 
        numOfProjects: 1, 
        displayNumProjectError: false
    };

    generateProjects = () => {
        //call endpoint to get all root nodes for logged in user 
        //put roots into list
        //set numOfProjects to list size
        //Put each respective project in list put in button within stack below the project name, and onclick function bringing user to respective tree (call filltree on respective root)
        return  <Box display='flex' paddingLeft='50px' paddingRight='50px'>
        <Stack  direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        <Button className="NewProjButton" paddingRight='20px' style = {{fontSize:'60px',  maxWidth: '150px', maxHeight: '200px', minWidth: '150px', minHeight: '200px'}} variant='outlined'   
            onClick={() => {
                if(this.state.numOfProjects > 4) {
                    this.setState({displayNumProjectError: true})
                }
                else {
                    window.location.href = '/prompt';
                }
            }
        }>+
        </Button>
        <Button paddingRight='20px' sx={{backgroundColor: '#fffff8'}}  style = {{fontSize:'18px', color:'black', maxWidth: '150px', maxHeight: '200px', minWidth: '150px', minHeight: '200px'}} variant='outlined'   
            onClick={() => {
                alert("Hi");
            }
        }>Ecommerce Proposal
        </Button>
    </Stack>
      </Box>
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    displayNumProjectError() {
        if (this.state.displayNumProjectError)
            return <Box display='flex' justifyContent='center' color='red'  alignItems='center' paddingTop='50px'>You may have a maximum of 4 projects, please delete a project if you wish to continue</Box>

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
                            window.location.href = '/login'
                        }
                         }><AccountCircle sx={{color:'black', fontSize:'50px'}}/>
                        </Button>
                    </Stack>
                    </div>
                      <div className='startDoc'>Start a new Project</div>
                        {this.generateProjects()}
                         {this.displayNumProjectError()}
                  </div>
                </div>
              )
        );
    }
}

export default Dashboard;
