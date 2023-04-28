import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import './auth.css';

// Once the user is logged in, takes the user's authentication token and saves it for this session
const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('jwtToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('jwtToken');
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [showPassword, setShowPassword] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const displayErrorMessage = () => {
        return <Box display='flex' justifyContent='center' color='red' alignItems='center' margin-top='10px'>{this.state.errorMessage}</Box>
    }

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:11000/api/login', {
                username,
                password
            });

            const token = response.data.token;
            setAuthToken(token);

            if (response.status === 200) {
                window.location.href = '/dashboard';
            }
            return response.status;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="form-container">
                <form className="form">   
                    <Link to="/">
                        <Button sx={{color: 'lightgrey'}} style={{fontSize:'13px', marginLeft:'20px', maxWidth: '50px', maxHeight: '25px', minWidth: '50px', minHeight: '25px' }} variant="standard">
                                home
                        </Button>
                    </Link>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Login</h3>
                        <div className="inputs">
                                <Box box={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>
                                    <AccountCircle sx={{ color: 'black', mr: 1, my: 2}} />
                                    <TextField className='usernameField' sx={{ input: { color: 'black' }, width: '180px' }} id="input-with-username" label="Username" variant="standard"
                                        InputLabelProps={{
                                            style: { color: "lightgrey" },
                                        }}
                                        onChange={(event) => setUsername(event.target.value)}
                                    />
                                </Box>
                                <Box box={{ display: 'flex', alignItems: 'flex-end', color: 'white' }}>
                                    <AccountCircle sx={{ color: 'black', mr: 1, my: 2 }} />
                                    <TextField className='usernameField' type={showPassword ? 'text' : 'password'} sx={{ input: { color: 'black' }, width: '180px' }} id="input-with-username" label="Password" variant="standard"
                                        InputLabelProps={{
                                            style: { color: "lightgrey" },
                                        }}
                                        onChange={(event) => setPassword(event.target.value)}
                                        InputProps={{
                                            // add an InputAdornment with a IconButton that toggles the showPassword state
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={toggleShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Box>
                            </div>
                        <div className="authSubmit">
                            <Stack paddingBottom={'20px'}>
                                <Button sx={{backgroundColor: 'rgb(0, 105, 62)'}} style={{ maxWidth: '80px', maxHeight: '40px', minWidth: '80px', minHeight: '40px' }} variant="contained"
                                    onClick={async () => {
                                        var message = await login()
                                        setStatus(message);
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
            {status !== 200 && status !== null && displayErrorMessage()}
        </div>
    )
}