import React from 'react';
import Card from './Card';
import Button from './Button';

const PostCard = ({ post, onEditClick, onDeleteClick, currentUserId }) => {
  const isOwner = post.userId === parseInt(currentUserId);

  //* Helper para obtener nombre a mostrar
  const getAuthorName = () => {
    return post.user?.profile?.name || post.user?.email || 'Usuario desconocido';
  };

  //* Helper para obtener inicial
  const getAuthorInitial = () => {
    const name = post.user?.profile?.name;
    if (name) return name.charAt(0).toUpperCase();
    
    const email = post.user?.email;
    if (email) return email.charAt(0).toUpperCase();
    
    return '?';
  };

  //* Helper para formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card hover className="flex flex-col h-full">
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary-500 font-bold mr-3 border border-slate-700 shrink-0">
            {getAuthorInitial()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-200 truncate">
              {getAuthorName()}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {post.user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-100 line-clamp-2">
            {post.title}
          </h3>
          {post.published && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap shrink-0">
              Publicado
            </span>
          )}
        </div>
        
        {post.content && (
          <p className="text-slate-400 line-clamp-3 mb-4">
            {post.content}
          </p>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-700 mt-auto">
        <span className="text-sm text-slate-500">
          {formatDate(post.created_at)}
        </span>
        
        <div className="flex space-x-2">
          {isOwner ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEditClick && onEditClick(post.id)}
              >
                Editar
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => onDeleteClick && onDeleteClick(post.id)}
              >
                Eliminar
              </Button>
            </>
          ) : (
            <span className="text-xs text-slate-600 italic px-2 py-1">Solo lectura</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
