import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-white text-center">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-4">Sehatin</h1>
        <p className="text-gray-600 text-sm">
          Platform untuk bantu kamu membangun kebiasaan sehat dan menjaga gaya hidup!
        </p>
      </div>
      <Link to="/auth/login" className="mt-10 bg-primary text-white py-3 rounded-lg font-semibold">
        Coba Sekarang
      </Link>
    </div>
  );
};

export default LandingPage;
