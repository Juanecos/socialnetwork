
const Card = ({ 
  children, 
  className = '',
  hover = false,
  ...props 
}) => {
  const baseStyles = 'bg-slate-800 border border-slate-700 rounded-lg p-6 transition-all duration-200';
  const hoverStyles = hover ? 'hover:border-primary-600' : '';
  
  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

