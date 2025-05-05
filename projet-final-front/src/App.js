// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register'
import Home from './pages/home';
import Post from './pages/post';
import Profile from './pages/profile';
import createPost from './pages/CreatePost';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={<createPost />} />
        <Route path="/NotFound" element={<NotFound />} />

        
      </Routes>
    </Router>
  );
}

export default App;
