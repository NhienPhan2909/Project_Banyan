import React, { Component } from 'react';
import './globals.css';

class Onboard extends Component {
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
        const response = await fetch('/onboard');
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
                    <h1>Onboard</h1>
                </header>
                <div className="express-output">{this.state.data}</div>
            </div>
        );
    }
}

export default Onboard;
