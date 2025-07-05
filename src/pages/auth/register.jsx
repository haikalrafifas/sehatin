import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData, updateUserData, setCurrentUser } from '../../utils/user';
import defaultUserSettings from '../../data/defaultUserSettings';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nicknameRef = useRef(null);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!nickname) return alert("Nama panggilan diperlukan!");
    if (!username) return alert("Username diperlukan!");
    if (!password) return alert("Password diperlukan!");

    // should be server side, will be improved after prototyping phase
    const existingUser = getUserData(username);
    if (existingUser) {
      setNickname('');
      setUsername('');
      setPassword('');
      nicknameRef.current.focus();
      return alert("Pengguna sudah terdaftar!");
    }
    updateUserData('profile', { nickname, username, password });
    updateUserData('settings', defaultUserSettings, username);

    setCurrentUser(username);
    navigate('/app');
  };

  return (
    <div className="p-6 min-h-screen flex flex-col justify-center bg-gray-100">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Daftar Akun</h2>
      <form onSubmit={handleRegister} className="flex flex-col justify-center">
        <input
          type="text"
          placeholder="Nama Panggilan"
          className="border p-3 rounded mb-4"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          autoFocus={true}
          required={true}
          ref={nicknameRef}
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <button type="submit" className="bg-primary text-white py-3 rounded font-semibold">
          Daftar
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Sudah punya akun?{' '}
        <Link to="/auth/login" className="text-primary underline">Masuk di sini</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
