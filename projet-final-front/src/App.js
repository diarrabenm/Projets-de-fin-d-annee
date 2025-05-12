import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';
import NotFound from './pages/NotFound';
import CommentSection from './components/comment';
import Header from './components/Header';
import  Sidebar from './components/Sidebar';
import CreatePost from './pages/CreatePost';
import Post from './pages/post';
import Login from './pages/login';
import CreateSubreddit from './pages/createsubreddit';
import RightSidebar from './components/RightSidebar';



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/createsubreddit" element={<CreateSubreddit />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/CommentSection" element={<CommentSection />} />
        <Route path="/RightSidebar" element={<RightSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;

