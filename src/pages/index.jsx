import { Link } from 'react-router-dom';
import appLogo from '../assets/app-logo.svg';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src={appLogo}
            alt="Logo Aplikasi"
            width={100}
          />
          <div>
            <Link to="/auth/register" className="text-primary font-medium hover:underline">
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-white">
        <div>
          <h2 className="text-4xl font-bold text-primary mb-2">Sehatin</h2>
          <p className="text-lg text-gray-700 mb-4">
            Platform untuk bantu kamu membangun kebiasaan sehat dan menjaga gaya hidup!
          </p>
          
          {/* Image or Illustration */}
          <img
            src="/landing-page-bg.svg"
            alt="Healthy Lifestyle"
            className="w-full md:w-2/3 mx-auto mb-6 max-w-80"
          />

          {/* Call to Action Button */}
          <Link
            to="/auth/login"
            className="mt-4 bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300 ease-in-out hover:bg-primary-dark"
          >
            Coba Sekarang
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 mt-6">
        <p className="text-sm text-gray-600">© 2025 SatuNol. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
