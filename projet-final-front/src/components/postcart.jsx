import React, { createContext, useContext, useState } from 'react';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const upvoteComment = (commentId, postId) => {
    // Logique pour upvoter un commentaire
  };
  const downvoteComment = (commentId, postId) => {
    // Logique pour downvoter un commentaire
  };

  return (
    <PostsContext.Provider value={{ posts, upvoteComment, downvoteComment }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
