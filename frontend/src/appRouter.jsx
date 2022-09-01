import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './pages/signup';
import Event from './pages/event';

const AppRouter = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/event/:id" element={<Event />} />
                </Routes>
            </Router>
        </div>
    );
}

export default AppRouter;
