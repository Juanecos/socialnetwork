import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthService from '../services/auth.service';
import PostService from '../services/post.service';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await PostService.getById(parseInt(id));
        setTitle(post.title || '');
        setContent(post.content || '');
        
        //* Formatear fecha para input datetime-local
        if (post.published_date) {
          const date = new Date(post.published_date);
          const tzOffset = date.getTimezoneOffset() * 60000;
          const localISOTime = (new Date(date - tzOffset)).toISOString().slice(0, 16);
          setPublishedAt(localISOTime);
        }
      } catch (error) {
        console.error('Error al cargar publicación', error);
        setError('No se pudo cargar la publicación');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      const userId = AuthService.getCurrentUserId();
      if (!userId) {
        throw new Error('Usuario no autenticado. Por favor inicia sesión nuevamente.');
      }
      
      const payload = {
        title,
        content,
        published_date: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()
      };

      await PostService.update(parseInt(id), payload);
      
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar publicación', error);
      setError(error.message || error.response?.data?.message || 'Error al actualizar la publicación.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="text-slate-400 mt-4">Cargando publicación...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100">
            Editar Publicación
          </h1>
          <p className="text-slate-400 mt-2">Actualiza tu publicación</p>
        </div>

        <Card>
          <form onSubmit={handleUpdatePost} className="space-y-6">
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
                disabled={saving}
                className="flex-1"
              >
                {saving ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                    Guardando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
                disabled={saving}
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

export default EditPost;
