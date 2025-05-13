import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './post.css';


function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/posts/${id}?populate=*`)
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du post :", err);
      });
  }, [id]);

  async function handleCommentSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:1337/api/comments',
        {
          data: {
            text: commentText,
            post: id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Commentaire ajouté !');
      setCommentText('');
    } catch (err) {
      alert('Erreur lors de l\'ajout du commentaire');
      console.error(err);
    }
  }

  if (!post) return <p>Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="mb-4">{post.content}</p>

      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          placeholder="Ajouter un commentaire"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Commentaires</h3>
      {(post.comments?.data || []).map((c) => (
        <p key={c.id} className="border-b border-gray-200 py-2">- {c.text}</p>
      ))}
    </div>
  );
}

export default Post;
