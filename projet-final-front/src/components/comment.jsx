import React, { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;

    const comment = {
      id: Date.now(),
      author,
      text: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setAuthor('');
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '16px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ 
        fontSize: '1.5rem',
        marginBottom: '16px',
        color: '#333'
      }}>
        Commentaires ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <input
            type="text"
            placeholder="Votre nom"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          
          <textarea
            placeholder="Ajouter un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            rows={3}
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
          
          <button 
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              alignSelf: 'flex-start'
            }}
          >
            Envoyer
          </button>
        </div>
      </form>

      <div style={{ marginTop: '24px' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ marginBottom: '16px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#1976d2',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {comment.author.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'baseline',
                  marginBottom: '4px'
                }}>
                  <span style={{ 
                    fontWeight: 'bold',
                    marginRight: '8px'
                  }}>
                    {comment.author}
                  </span>
                  <span style={{ 
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>
                    {comment.timestamp}
                  </span>
                </div>
                <p style={{ 
                  margin: 0,
                  color: '#333'
                }}>
                  {comment.text}
                </p>
              </div>
            </div>
            <hr style={{ 
              border: 'none',
              borderTop: '1px solid #eee',
              marginLeft: '56px'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
