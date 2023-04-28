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
        anchorEl: null,
        deleteMode: false,
        projects: []
    };

    componentDidMount() {
        this.getProjects();
    }

    handlePopoverOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    // Implement logic to delete project
    handleDeleteProject = () => {
        this.setState({ deleteMode: true });
        this.setState({ displayNumProjectError: false });
        this.handlePopoverClose();
    };

    // Implement logic to cancel the delete function
    cancelDelete = () => {
        this.setState({ deleteMode: false });
        this.handlePopoverClose()
    };

    // Handle the appeareance and the function of buttons related to deletion of projects
    buttonMode = () => {
        if (this.state.deleteMode) {
            return <Button variant="contained" className="popover-button" sx={{ mb: 1 }} onClick={this.cancelDelete}>Cancel</Button>
        }
        else {
            return <Button variant="contained" className="popover-button" sx={{ mb: 1 }} onClick={this.handleDeleteProject}>Delete</Button>
        }
    }

    // Handle the logout function of a user
    handleLogout = () => {
        localStorage.setItem("jwtToken", "");
        window.location.href = '/login';
        this.handlePopoverClose();
    };

    // Retrieve a project and all its nodes fromt the database
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

    // Handle the deletion of a project
    deleteProject = async (projectId) => {
        try {
            const token = localStorage.getItem('jwtToken');

            // first, get the project from the database to see which nodes to delete
            const initialResponse = await axios.get(`http://localhost:11000/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // delete the root nodes (this will recursively delete the child nodes)
            const nodeResponse = await axios.delete(`http://localhost:11000/nodes/delete/${initialResponse.data._rootId}`);

            // then, after all references are cleared, delete the project
            const projectResponse = await axios.delete(`http://localhost:11000/projects/delete/${initialResponse.data._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // remove the project from the component state (delete the project appeareance on the front end)
            this.setState({ projects: this.state.projects.filter((x) => x._id !== projectId) });

            return projectResponse.status;
        }
        catch (err) {
            console.log(err);
            return err.response.status;
        }
    };

    // Congifure and handle the appearance of the header on the dashboard page
    displayHeader = () => {
        return <div id='dash-header'>
            <Box id='spacer' />
            <img id='logo' alt="Banyan Logo" src="BanyanText_Transparent.png" />
            <Box id='settings'>
                <Button onClick={this.handlePopoverOpen}>
                    <SettingsIcon sx={{ color: 'rgb(21, 20, 20)', fontSize: '50px' }} />
                </Button>
            </Box>
            <Popover
                open={Boolean(this.state.anchorEl)}
                anchorEl={this.state.anchorEl}
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
                    <Button className="popover-button" variant="contained" onClick={this.handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Popover>
        </div>
    }

    // Congifure and handle the appearance of projects as boxes on the dashboard page
    displayProjects = () => {
        return <Box id="dash-projects">
            <div id="projects-text">Your Projects</div>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Button className="project-button" id="NewProjButton" variant='contained'
                    onClick={() => {
                        window.location.href = '/prompt';
                    }
                    }>+
                </Button>
                {this.state.projects.length && this.state.projects.map(project => (
                    <Button className="project-button" key={project._id} variant='contained'
                        onClick={() => {
                            if (this.state.deleteMode === true) {
                                this.deleteProject(project._id)
                                this.setState({ deleteMode: false })
                                
                            }
                            else {
                                window.location.href = '/tree/' + project._id;
                            }
                        }}
                    >{project.name}</Button>
                ))}
            </Stack>
        </Box>
    }

    // Display a message for the user to confirm that the user has activated the delete function
    displayDeleteMessage = () => {
        if (this.state.deleteMode === true)
            return <Box display='flex' justifyContent='center' color='red' alignItems='center' paddingTop={'100px'} margin-top='10px'>
                Please select a project to delete
            </Box>;
    }

    render() {
        return (
            <div id="dash-container">
                <div id="dash-form">
                    {this.displayHeader()}
                    {this.displayProjects()}
                    {this.displayDeleteMessage()}
                </div>
            </div>
        );
    }
}

export default Dashboard;