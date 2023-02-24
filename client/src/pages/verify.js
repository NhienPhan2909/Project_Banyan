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
        return <Box display='flex' justifyContent='center' color='red'  alignItems='center' margin-top='10px'>Please check your login credentials</Box>
    }
    
    displaySuccess = () => {
        return <Box display='flex' justifyContent='center' color='green'  alignItems='center' margin-top='10px'>Sucess! Redirected in 5 seconds.</Box>
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
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
            var token = window.location.search.replace('?token=', '');
            const response = await axios.post('http://localhost:11000/api/verify', {
                token
            });

            console.log(response);

            if (response.status === 200) {
                this.state.sucess = true;
    
                var interval = setInterval(myURL, 5000);
                function myURL () {
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
                        <Button style = {{maxWidth: '120', maxHeight: '40px', minWidth: '80px', minHeight: '40px'}} variant="contained"   
                            onClick={async () => {
                                var message = await this.verify()
                                this.setState({ status: message });
                            }}
                        >Verify Email
                        </Button>
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