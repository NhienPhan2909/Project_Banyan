import React from 'react';
import axios from 'axios';
import './globals.css';
import {TextField} from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './auth.css';


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            signinStatus: null
        };
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

    changeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
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

    displayErrorMessage = () => {
            return <Box display='flex' justifyContent='center' color='red'  alignItems='center'>Your username or email is associated with another account</Box>
    }

    submitForm = async () => {
        const { username, password, email } = this.state;
        try {
            const response = await axios.post('http://localhost:11000/api/register', {
                username,
                email,
                password
            });
            console.log(response)
            if (response.status === 200) {
                 window.location.href = '/prompt';
             }
             this.setState({signinStatus: response.status})
             console.log(response);
            return response.status;
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
                                var resp = this.submitForm();
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
            {this.state.signinStatus !== 200 && this.state.signinStatus !== null && (
            <div>
            {this.displayErrorMessage()}
            </div>
            )}
            </div>
          )
    }
}

export default Signup;
