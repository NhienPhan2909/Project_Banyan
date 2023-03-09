import { Box } from '@mui/material';
import React, { Component } from 'react';
import './dashboard.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import axios from 'axios';

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
    if (this.state.projects.length === 0) {
      this.handlePopoverClose()
    }
    else {
      this.setState({ deleteMode: true });
      this.handlePopoverClose()
    }
  };

  cancelDelete = () => {
    // implement logic to delete project
      this.setState({ deleteMode: false });
      this.handlePopoverClose()
  };

  buttonMode = () => {
    if(this.state.deleteMode) {
      return <Button variant="contained" sx={{ mb: 1 }} onClick={this.cancelDelete}>Cancel</Button>
    }
    else {
      return  <Button variant="contained" sx={{ mb: 1 }} onClick={this.handleDeleteProject}>Delete Project</Button>
    }
  }

  handleLogout = () => {
    localStorage.setItem("jwtToken", "");
    window.location.href = '/login';
    this.handlePopoverClose();
  };

  getProjects = async () => {
    const token = localStorage.getItem('jwtToken');

    if (typeof token !== "string") {
      console.log("Not string");
    }

    const response = await axios.post('http://localhost:11000/projects/dashboard', {
      token
    });

    this.setState({ projects: response.data.projects });
  }

  deleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (typeof token !== 'string') {
        console.log('Not string');
      }

      const initialResponse = await axios.get(`http://localhost:11000/projects/${projectId}`);
      const nodeResponse = await axios.delete(`http://localhost:11000/nodes/delete/${initialResponse.data._rootId}`);
      const projectResponse = await axios.delete(`http://localhost:11000/projects/delete/${initialResponse.data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.setState({ projects: this.state.projects.filter((x) => x._id !== projectId) });

      return projectResponse.status;
    }
    catch (err) {
      console.log(err);
      return err.response.status;
    }
  };

  generateProjects = () => {
    // need onclick function bringing user to respective tree (call filltree on respective project)
    return <Box display='flex' paddingLeft='50px' paddingRight='50px'>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        <Button className="project-button" id="NewProjButton" variant='outlined'
          onClick={() => {
            if (this.state.projects.length >= 4) {
              this.setState({ displayNumProjectError: true })
            }
            else {
              window.location.href = '/prompt';
            }
          }
          }>+
        </Button>
        {this.state.projects.length && this.state.projects.map(project => (
          <Button className="project-button" id='projects' sx={{ backgroundColor: '#fffff8' }} key={project._id} variant='outlined'
            onClick={() => {
              if (this.state.deleteMode === true) {
                console.log(project._id)
                this.deleteProject(project._id)
                this.setState({ deleteMode: false })
              }
              else {
                window.location.href = '/tree/' + project._id;
              }
              console.log(this.state.deleteMode)
            }}
          >{project.name}</Button>
        ))}
      </Stack>
    </Box>
  }

  componentDidMount() {
    this.getProjects();
  }

  displayNumProjectError() {
    if (this.state.displayNumProjectError)
      return <Box display='flex' justifyContent='center' color='red' alignItems='center' paddingTop='75px'>You may have a maximum of 4 projects, please delete a project if you wish to continue</Box>
  }

    displayDeleteMessage = () => {
    if (this.state.deleteMode === true)
      return <Box display='flex' justifyContent='center' color='red' alignItems='center' paddingTop={'75px'} margin-top='10px'>Please select a project to delete</Box>
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="dash-container">
        <div className="dash-form">
          <div className='dashHeader'>
            <h3>My Projects</h3>
            <Box paddingTop={'35px'}>
              <Button
                style={{ maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px' }}
                onClick={this.handlePopoverOpen}
              >
                <SettingsIcon sx={{ color: 'black', fontSize: '50px' }} />
              </Button>
            </Box>
            <Stack className='projects' direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} display='flex'>
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
                  {this.buttonMode()}
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
          {this.displayDeleteMessage()}
        </div>
      </div>
    );
  }
}

export default Dashboard;