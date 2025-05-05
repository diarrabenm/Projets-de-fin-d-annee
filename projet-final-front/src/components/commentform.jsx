import React, { useState } from 'react';
import { usePosts } from '../contexts/PostsContext';
import { useAuth } from '../context/Authcontext';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onSuccess?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, parentId, onSuccess }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = usePosts();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('You need to be logged in to comment');
      return;
    }
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await addComment(postId, content, parentId);
      setContent('');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white resize-none"
        rows={3}
        placeholder={isAuthenticated ? "What are your thoughts?" : "Log in to comment"}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!isAuthenticated || isSubmitting}
        required
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg transition-colors ${
            isAuthenticated
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-slate-300 text-slate-600 cursor-not-allowed'
          }`}
          disabled={!isAuthenticated || isSubmitting}
        >
          {isSubmitting ? 'Posting...' : parentId ? 'Reply' : 'Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;