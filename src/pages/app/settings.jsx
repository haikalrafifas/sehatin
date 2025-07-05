import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserData, logout } from '../../utils/user';

const SettingsPage = () => {
  const user = getUserData();
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const toggleNotifications = () => setIsNotificationEnabled(!isNotificationEnabled);

  const handleLogout = () => {
    logout();
    navigate('/auth/login', { state: { from: location }, replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Avatar + Username Section */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-300"></div> {/* Avatar Circle */}
        <div>
          <p className="text-lg font-semibold">{user?.profile?.nickname}</p>
          <p className="text-sm text-gray-500">@{user?.profile?.username}</p>
        </div>
      </div>

      {/* Enable Notifications Toggle */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <p className="text-sm">Aktifkan Notifikasi</p>
        <label className="inline-flex relative items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only" 
            checked={isNotificationEnabled} 
            onChange={toggleNotifications} 
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
          <span 
            className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all ${isNotificationEnabled ? 'transform translate-x-5 bg-blue-500' : ''}`}
          ></span>
        </label>
      </div>

      {/* Update Form Button */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <button 
          className="w-full bg-gray-200 text-black py-2 rounded-md hover:bg-blue-600 transition"
        >
          Ubah Data
        </button>
      </div>

      {/* Logout Button */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <button 
          onClick={handleLogout} 
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Keluar
        </button>
      </div>

    </div>
  );
};

export default SettingsPage;
