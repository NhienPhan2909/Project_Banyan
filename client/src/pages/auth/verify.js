import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './auth.css';


class Verify extends Component {
    state = {
        username: '',
        password: '',
        status: null,
        sucess: null
    };

    displayErrorMessage = () => {
        return <Box display='flex' justifyContent='center' color='red' alignItems='center' margin-top='10px'>Please check your login credentials</Box>
    }

    displaySuccess = () => {
        return <Box display='flex' justifyContent='center' color='green' alignItems='center' margin-top='10px'>Sucess! Redirected in 3 seconds.</Box>
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
        this.runVerification();
    }

    // Have to use a helper because of async function verify
    async runVerification() {
        const status = await this.verify();
        this.setState({ status: status });
    }

    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/verify');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    verify = async () => {
        try {
            var activationToken = window.location.search.replace('?token=', '');
            const response = await axios.post('http://localhost:11000/api/verify', {
                activationToken
            });

            console.log(response);

            if (response.status === 200) {
                this.state.sucess = true;
                localStorage.setItem('jwtToken', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                var interval = setInterval(myURL, 3000);
                function myURL() {
                    window.location.href = '/prompt'
                }
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
                            <h3 className="Auth-form-title">Verification</h3>
                            <div className="inputs">
                                <div className="form-group mt-3">
                                </div>
                                <div className="form-group mt-3">
                                </div>
                            </div>
                            <div className="authSubmit">
                                <Stack>
                                    Verifying email...
                                </Stack>
                            </div>
                            <p className="text-center mt-2">
                                <a href="#">Resend Verification Email?</a>
                            </p>
                        </div>
                    </form>
                </div>
                {this.state.status !== 200 && this.state.status !== null && (
                    <div>
                        {this.displayErrorMessage()}
                    </div>
                )}
                {this.state.sucess === true && (
                    <div>
                        {this.displaySuccess()}
                    </div>
                )}
            </div>
        )
    }
}

export default Verify;