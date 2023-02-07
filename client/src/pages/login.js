import React, { Component } from 'react';
import './globals.css';

class Login extends Component {
    state = {
        data: null
    };

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
            <div className="page">
                <header className="header">
                    <h1>Login</h1>
                </header>
                <div className="express-output">{this.state.data}</div>
            </div>
        );
    }
}

export default Login;
