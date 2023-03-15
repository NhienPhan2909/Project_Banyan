import {React, useState, useEffect} from 'react';
import axios from 'axios';

// nav page imports
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route, Navigate}
	from 'react-router-dom';

import Onboard from './pages';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Prompt from './pages/prompt';
import Tree from './pages/tree';
import Signup from './pages/signup';
import Verify from './pages/verify';


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
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar authorized = {authenticated}/>
            <Routes>
                <Route exact path='/' element={<Onboard />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={authenticated ? <Dashboard /> : <Navigate to='/login' />} />
                <Route path='/prompt' element={authenticated ? <Prompt /> : <Navigate to='/login' />} />
                <Route path='/tree/:_projectId' element={authenticated ? <Tree /> : <Navigate to='/login' />} />
                <Route path='/api/verify' element={<Verify />} />
            </Routes>
        </Router>
    );
}

export default App;
