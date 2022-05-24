import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, Chat, SetAvatar } from './pages';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/setAvatar" element={<SetAvatar />} />
                <Route path="/" element={<Chat />} />
            </Routes>
        </Router>
    );
}
