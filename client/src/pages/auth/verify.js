import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import './auth.css';


export default function Verify() {

    const [status, setStatus] = useState(null);
    const [success, toggleSuccess] = useState(false);

    const displayErrorMessage = () => {
        return <Box display='flex' justifyContent='center' color='red' alignItems='center' margin-top='10px'>Please check your login credentials</Box>
    }

    const displaySuccess = () => {
        return <Box display='flex' justifyContent='center' color='green' alignItems='center' margin-top='10px'>Success! Redirected in 3 seconds.</Box>
    }

    // Have to use a helper because of async function verify
    const runVerification = async () => {
        const status = await verify();
        setStatus(status);
    }
    // Calling runVerification once the component mounts
    useEffect(runVerification);

    const verify = async () => {
        try {
            var activationToken = window.location.search.replace('?token=', '');
            const response = await axios.post('http://localhost:11000/api/verify', {
                activationToken
            });

            if (response.status === 200) {
                toggleSuccess(true);
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
            {status !== 200 && status !== null && (
                <div>
                    {displayErrorMessage()}
                </div>
            )}
            {success === true && (
                <div>
                    {displaySuccess()}
                </div>
            )}
        </div>
    );
}
