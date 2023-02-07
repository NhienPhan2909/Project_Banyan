import React from 'react';

// nav page imports
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';

import Onboard from './pages';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Prompt from './pages/prompt';
import Tree from './pages/tree';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Onboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/prompt' element={<Prompt />} />
                <Route path='/tree' element={<Tree />} />
            </Routes>
        </Router>
    );
}

export default App;
