import { Box } from '@mui/material';
import React, { Component } from 'react';
import './dashboard.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';import axios from 'axios';

import SettingsIcon from '@mui/icons-material/Settings';

class Dashboard extends Component {
    
    state = {
        displayNumProjectError: false,
        anchorEl: null,
        deleteMode: false, 
        projects: []
      };

      handlePopoverOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
      };
      
      handlePopoverClose = () => {
        this.setState({ anchorEl: null });
      };

      handleDeleteProject = () => {
        // implement logic to delete project
        this.setState({ deleteMode: true});
        this.handlePopoverClose();
      };
      
      handleLogout = () => {
        window.location.href = '/login';
        this.handlePopoverClose();
      };

    getRoots = async () => {
        // get token string (hashed)
        var token = localStorage.getItem('jwtToken');
        if (typeof token !== "string") {
          console.log("Not string");
        }
        
        const response = await axios.post('http://localhost:11000/projects/dashboard', {
            token
        });

        this.setState({ projects: response.data.projects });
    }

    generateProjects = () => {
        // need onclick function bringing user to respective tree (call filltree on respective project)
        return <Box display='flex' paddingLeft='50px' paddingRight='50px'>
        <Stack  direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
            <Button className="project-button" id="NewProjButton" variant='outlined'   
                onClick={() => {
                    if(this.state.projects.length > 4) {
                        this.setState({displayNumProjectError: true})
                    }
                    else {
                        window.location.href = '/prompt';
                    }
                }
            }>+
            </Button>
            {this.state.projects.length && this.state.projects.map( project => (
                <Button className="project-button" id='projects' sx={{backgroundColor: '#fffff8'}} key={project._id} variant='outlined'   
                    onClick={() => {
                        window.location.href = '/tree/' + project._id;
                    }}
                >{project.name}</Button>
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
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
      
        return (
          <div className="dash-container">
            <div className="dash-form">
              <div className='dashHeader'>
                <h3>My Projects</h3>
                <Stack className='projects' direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} display='flex'>
                  <Button 
                    style={{ maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px' }} 
                    onClick={this.handlePopoverOpen}
                  >
                    <SettingsIcon sx={{ color: 'black', fontSize: '50px' }} />
                  </Button>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Box display={'flex'} flexDirection={'column'} sx={{ p: 2, pb: 0, gap: 0.2 }}>
                      <Button variant="contained" sx={{ mb: 1 }} onClick={this.handleDeleteProject}>
                        Delete Project
                      </Button>
                      </Box>
                      <Box display={'flex'} flexDirection={'column'} sx={{ p: 2, pt: 0, gap: 0.2 }}>
                      <Button variant="contained" onClick={this.handleLogout}>
                        Logout
                      </Button>
                    </Box>
                  </Popover>
                </Stack>
              </div>
              <div className='startDoc'>Start a new Project</div>
              {this.generateProjects()}
              {this.displayNumProjectError()}
            </div>
          </div>
        );
      }
}

export default Dashboard;