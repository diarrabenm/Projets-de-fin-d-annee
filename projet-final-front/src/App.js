// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register'
import Home from './pages/home';
import Post from './pages/post';
import Profile from './pages/profile';
import createPost from './pages/CreatePost';
import NotFound from './pages/NotFound';
import CommentSection from './components/comment';
import Header from './components/Header';
import  Sidebar from './components/Sidebar';



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
        <Route path="/commentsection" element={<CommentSection />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/Sidebar" element={<Sidebar />} />
       
     
      </Routes>
    </Router>
  );
}

export default App;
