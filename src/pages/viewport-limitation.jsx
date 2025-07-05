import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewportLimitation = ({ children }) => {
  const [isMobile, setIsMobile] = useState(true);

  const checkMobileViewport = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkMobileViewport();
    window.addEventListener('resize', checkMobileViewport);

    return () => {
      window.removeEventListener('resize', checkMobileViewport);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Maaf, aplikasi kami hanya baru mendukung tampilan <i>mobile</i>.<br />
            <Link to="/" className="text-primary underline">Kembali ke beranda</Link>
          </h2>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ViewportLimitation;
