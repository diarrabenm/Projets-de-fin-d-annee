// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import CreatePost from './pages/CreatePost';
import Post from './pages/post';

import CommentSection from './components/comment';
import Header from './components/Header';
import RightSidebar from './components/RightSidebar'


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/rightsidebar" element={<RightSidebar />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/commentsection" element={<CommentSection />} />
        <Route path="/Header" element={<Header />} />
       
       
     
      </Routes>
    </Router>
  );
}

export default App;
