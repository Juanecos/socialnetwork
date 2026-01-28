import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import PostCard from '../components/PostCard';
import PostService from '../services/post.service';
import AuthService from '../services/auth.service';

function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = AuthService.getCurrentUserId();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await PostService.getAll();
        setPosts(data);
      } catch (error) {
        console.error('Error al cargar publicaciones', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      try {
        await PostService.delete(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error al eliminar publicación', error);
        alert('No se pudo eliminar la publicación. Intenta de nuevo.');
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-100">
              Panel Principal
            </h1>
            <p className="text-slate-400 mt-2">¡Bienvenido de nuevo! Aquí están tus últimas publicaciones.</p>
          </div>
          <Button onClick={() => navigate('/create')} variant="primary">
            + Publicar
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <p className="text-slate-400 mt-4">Cargando publicaciones...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onEditClick={(id) => navigate(`/edit/${id}`)}
                onDeleteClick={handleDeletePost}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">No hay publicaciones aún</h3>
              <p className="text-slate-400 mb-6">
                ¡Comienza creando tu primera publicación!
              </p>
              <Button onClick={() => navigate('/create')} variant="primary">
                Crear Tu Primera Publicación
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;

