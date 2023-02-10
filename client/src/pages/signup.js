import React, { Component, useState } from 'react';
import './globals.css';
import {TextField} from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './auth.css';


class Signup extends Component {
    state = {
        username: null,
        password: null,
        email : null, 
    };
    
    changeUsername = e => {
        this.state.username = e.target.value;
        console.log(e.target.value);
    }
      
    changePassword = e => {
        this.state.password = e.target.value;
    }
      
    changeEmail = e => {
        this.state.email = e.target.value;
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/login');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
        }
        return body;
    };

    render() {
          return (
            <div className="form-container">
              <form className="form">
                <div className="Auth-form-content">
                  <h3 className="Auth-form-title">Sign Up</h3>
                  <div className="inputs">
                  <div className="form-group mt-3">
                <Box box={{ display: 'flex', alignItems: 'flex-end', color: 'white'}}>
                  <AccountCircle sx={{ color: 'black', mr: 1, my: 1 }} />
                  <TextField className = 'usernameField' sx={{ input: { color: 'black' } }} id="input-with-username" label="Username" variant="standard"
                    InputLabelProps={{
                        style: { color: "lightgrey" },
                    }}
                    onChange={this.changeUsername}
                  />
              </Box>
                  </div>
                  <div className="form-group mt-3">
                    <Box box={{ display: 'flex', alignItems: 'flex-end', color: 'white'}}>
                        <AccountCircle sx={{ color: 'black', mr: 1, my: 1 }} />
                        <TextField className = 'usernameField' sx={{ input: { color: 'black' } }} id="input-with-username" label="Password" variant="standard"
                            InputLabelProps={{
                             style: { color: "lightgrey" },
                            }}
                            onChange={this.changePassword}
                        />
                    </Box>
                  </div>
                  <div className="form-group mt-3">
                    <Box box={{ display: 'flex', alignItems: 'flex-end', color: 'white'}}>
                        <AccountCircle sx={{ color: 'black', mr: 1, my: 1 }} />
                        <TextField className = 'usernameField' sx={{ input: { color: 'black' } }} id="input-with-username" label="Email" variant="standard"
                            InputLabelProps={{
                                style: { color: "lightgrey" },
                            }}
                            onChange={this.changeEmail}
                        />
                    </Box>
                  </div>
                  </div>
                  <div className="authSubmit">
                  <Stack>
                        <Button style = {{maxWidth: '80px', maxHeight: '40px', minWidth: '80px', minHeight: '40px'}} variant="contained" 
                            onClick={() => {
                              alert(this.state.username + " " + this.state.password + " " + this.state.email);
                            }}>
                          Submit</Button>
                  </Stack>
                  </div>
                  <p className="text-center mt-2">
                    <a href="#">Forgot password?</a>
                  </p>
                </div>
              </form>
            </div>
          )
    }
}

export default Signup;
