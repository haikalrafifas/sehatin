import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { getUserProfile } from '../../utils/user';

const LoginPage = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username) return alert("Username diperlukan!");
    if (!password) return alert("Password diperlukan!");

    const user = getUserProfile(username);
    if (user && user.password === password) {
      localStorage.setItem('currentUser', username);
      navigate('/app');
    } else {
      alert('Username atau password salah.');
      setUsername('');
      setPassword('');
      usernameRef.current.focus();
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col justify-center bg-gray-100">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Masuk ke Sehatin</h2>
      <form onSubmit={handleLogin} className="flex flex-col justify-center">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded mb-4 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          autoFocus={true}
          ref={usernameRef}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <button type="submit" className="bg-primary text-white py-3 rounded font-semibold">
          Masuk
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Belum punya akun?{' '}
        <Link to="/auth/register" className="text-primary underline">Daftar di sini</Link>
      </p>
    </div>
  );
};

export default LoginPage;
