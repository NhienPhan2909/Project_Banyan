import { Box } from '@mui/material';
import React, { Component } from 'react';
import './dashboard.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import axios from 'axios';

import AccountCircle from '@mui/icons-material/AccountCircle';


class Dashboard extends Component {
    
    state = {
        displayNumProjectError: false
    };

    getRoots = async () => {
        // get token string (hashed)
        var token = localStorage.getItem('jwtToken');
        
        const response = await axios.post('http://localhost:11000/root/dashboard', {
            token
        });

        this.setState({ roots: response.data.roots });
    }

    generateProjects = () => {
        // need onclick function bringing user to respective tree (call filltree on respective root)
        return <Box display='flex' paddingLeft='50px' paddingRight='50px'>
        <Stack  direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
            <Button className="project-button" id="NewProjButton" variant='outlined'   
                onClick={() => {
                    if(this.state.roots.length > 4) {
                        this.setState({displayNumProjectError: true})
                    }
                    else {
                        window.location.href = '/prompt';
                    }
                }
            }>+
            </Button>
            {this.state.roots && this.state.roots.map( root => (
                <Button className="project-button" sx={{backgroundColor: '#fffff8'}} key={root._id} variant='outlined'   
                    onClick={() => {
                        window.location.href = '/tree/' + root._id;
                    }}
                >{root.name}</Button>
            ))}
        </Stack>
        </Box>
    }

    componentDidMount() {
        this.getRoots();
    }

    displayNumProjectError() {
        if (this.state.displayNumProjectError)
            return <Box display='flex' justifyContent='center' color='red'  alignItems='center' paddingTop='50px'>You may have a maximum of 4 projects, please delete a project if you wish to continue</Box>
    }

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
                                }}><AccountCircle sx={{color:'black', fontSize:'50px'}}/>
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
