import React, { Component, useState } from 'react';
import axios from 'axios';
import {TextField} from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './auth.css';

const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('jwtToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('jwtToken');
        delete axios.defaults.headers.common['Authorization'];
    }
};

class Login extends Component {
    state = {
        username: '',
        password: '',
        loginStatus: null
    };
    
    changeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    displayErrorMessage = () => {
        return <Box display='flex' justifyContent='center' color='red'  alignItems='center' margin-top='10px'>Please check your login credentials</Box>
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

    login = async () => {
        try {
            var username = this.state.username
            var password = this.state.password
            const response = await axios.post('http://localhost:11000/api/login', {
                username,
                password
            });

            console.log(response);
            const token = response.data.token;
            setAuthToken(token);

            if (response.status === 200) {
                window.location.href = '/dashboard';
            }
            return response.status
        } catch (error) {
            console.error(error);
        }
    }

    render() {
            return (
                <div>
              <div className="form-container">
                <form className="form">
                  <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
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
                    </div>
                    <div className="authSubmit">
                    <Stack>
                        <Button style = {{maxWidth: '80px', maxHeight: '40px', minWidth: '80px', minHeight: '40px'}} variant="contained"   
                            onClick={async () => {
                                var message = await this.login()
                                this.setState({ loginStatus: message });
                            }}
                        >Submit
                        </Button>
                    </Stack>
                    </div>
                    <p className="text-center mt-2">
                      <a href="#">Forgot password?</a>
                    </p>
                  </div>
                </form>
              </div>
              {this.state.loginStatus !== 200 && this.state.loginStatus !== null && (
                <div>
                {this.displayErrorMessage()}
                </div>
                )}
              </div>
            )
          }
}

export default Login;