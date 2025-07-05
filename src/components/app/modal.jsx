const Modal = ({ title, show, onClose, children }) => {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button onClick={onClose} className="text-xl text-gray-500">&times;</button>
          </div>
          <div className="mt-4">
            {children}
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={onClose} 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-white"
            >
              Oke
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
