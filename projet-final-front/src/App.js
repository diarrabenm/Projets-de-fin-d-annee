import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import CreatePost from './pages/CreatePost';
import Post from './pages/post';
import CreateSubreddit from './pages/createsubreddit';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/createsubreddit" element={<CreateSubreddit />} />
      </Routes>
    </Router>
  );
}

export default App;

