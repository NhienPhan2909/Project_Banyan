import {React, useState, useEffect} from 'react';
import axios from 'axios';

// nav page imports
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, Navigate}
	from 'react-router-dom';

import Onboard from './pages/onboard';
import Dashboard from './pages/dashboard';
import Prompt from './pages/prompt';
import TreeContainer from './pages/tree';

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Verify from './pages/auth/verify';

import FadeLoader from "react-spinners/FadeLoader";


function App() {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
        axios.get('/api/protected', { headers: { Authorization: token } })
            .then(res => setAuthenticated(true))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
        } else {
        setLoading(false);
        }
    }, []);

    if (loading) {
        return <FadeLoader loading={loading} size={30} sx={{color: 'rgb(0, 105, 62)'}} style={{backgroundColor: '69af77', position: 'fixed', top: '5%', left: '50%', transform: 'translateX(-50%)',}}/>
    }

    return (
        <Router>
            {/* {!authenticated && <Navbar />} */}
            <Routes>
                <Route exact path='/' element={authenticated ? <Dashboard /> : <Onboard />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={authenticated ? <Dashboard /> : <Navigate to='/login' />} />
                <Route path='/prompt' element={authenticated ? <Prompt /> : <Navigate to='/login' />} />
                <Route path='/tree' element={authenticated ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />
                <Route path='/tree/:_projectId' element={authenticated ? <TreeContainer /> : <Navigate to='/login' />} />
                <Route path='/api/verify' element={<Verify />} />
            </Routes>
        </Router>
    );
}

export default App;
