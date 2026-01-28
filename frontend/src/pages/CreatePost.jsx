import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthService from '../services/auth.service';
import PostService from '../services/post.service';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userId = AuthService.getCurrentUserId();
      if (!userId) {
        throw new Error('Usuario no autenticado. Por favor inicia sesión nuevamente.');
      }
      
      const payload = {
        title,
        content,
        userId: parseInt(userId),
        published_date: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()
      };

      const data = await PostService.create(payload);
      
      console.log('Publicación creada:', data);
      navigate('/');
    } catch (error) {
      console.error('Error al crear publicación', error);
      setError(error.message || error.response?.data?.message || 'Error al crear la publicación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100">
            Crear Nueva Publicación
          </h1>
        </div>

        <Card>
          <form onSubmit={handleCreatePost} className="space-y-6">
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <Input
              label="Título"
              type="text"
              name="title"
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
            <Input
              label="Contenido"
              type="textarea"
              name="content"
              placeholder="Escribe el contenido de tu publicación aquí..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />

            <Input
              label="Fecha de Publicación"
              type="datetime-local"
              name="published_at"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              placeholder="Selecciona una fecha"
            />

            <div className="flex items-center space-x-4 pt-4">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                    Creando...
                  </>
                ) : (
                  'Publicar'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

export default CreatePost;

