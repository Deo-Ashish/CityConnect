const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-xl font-semibold mb-4">
            {title}
          </h2>
        )}

        {children}
        
      </div>
    </div>
  );
};

export default Modal;