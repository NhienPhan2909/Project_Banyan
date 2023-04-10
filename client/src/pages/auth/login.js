import React, { Component, useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
        loginStatus: null,
        showPassword: false,
        errorMessage: ''
    };

    toggleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

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
        return <Box display='flex' justifyContent='center' color='red' alignItems='center' margin-top='10px'>{this.state.errorMessage}</Box>
    }

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
            if (error.response) {
                console.log(error.response.data.msg);
                this.setState({errorMessage: error.response.data.msg})
            }
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
                                    <Box box={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>
                                        <AccountCircle sx={{ color: 'black', mr: 1, my: 2}} />
                                        <TextField className='usernameField' sx={{ input: { color: 'black' }, width: '180px' }} id="input-with-username" label="Username" variant="standard"
                                            InputLabelProps={{
                                                style: { color: "lightgrey" },
                                            }}
                                            onChange={this.changeUsername}
                                        />
                                    </Box>
                                    <Box box={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>
                                        <AccountCircle sx={{ color: 'black', mr: 1, my: 2 }} />
                                        <TextField className='usernameField' type={this.state.showPassword ? 'text' : 'password'} sx={{ input: { color: 'black' }, width: '180px' }} id="input-with-username" label="Password" variant="standard"
                                            InputLabelProps={{
                                                style: { color: "lightgrey" },
                                            }}
                                            onChange={this.changePassword}
                                            InputProps={{
                                                // add an InputAdornment with a IconButton that toggles the showPassword state
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.toggleShowPassword}
                                                            edge="end"
                                                        >
                                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Box>
                                </div>
                            <div className="authSubmit">
                                <Stack paddingBottom={'10px'}>
                                    <Button sx={{backgroundColor: 'rgb(0, 105, 62)'}} style={{ maxWidth: '80px', maxHeight: '40px', minWidth: '80px', minHeight: '40px' }} variant="contained"
                                        onClick={async () => {
                                            var message = await this.login()
                                            this.setState({ loginStatus: message });
                                        }}
                                    >Submit
                                    </Button>
                                </Stack>
                            </div>
                            <p className="text-center mt-2">
                                <a href="/signup">Need an account?</a>
                            </p>
                        </div>
                    </form>
                </div>
                {this.state.loginStatus !== 200 && this.state.loginStatus !== null && this.displayErrorMessage()}
            </div>
        )
    }
}

export default Login;