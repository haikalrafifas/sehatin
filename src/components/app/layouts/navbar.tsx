import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white z-50">
      <div className="flex justify-between items-center py-2 px-8">
        {/* Daily Quests */}
        <Link to="/app/daily-quests" className="flex justify-center items-center text-primary text-xl">
          <i className="fas fa-tasks"></i>
        </Link>

        {/* Dashboard */}
        <Link to="/app" className="flex justify-center items-center bg-primary p-3 rounded-full -mt-4">
          <i className="fas fa-tachometer-alt text-white text-2xl"></i>
        </Link>

        {/* Settings */}
        <Link to="/app/settings" className="flex justify-center items-center text-primary text-xl">
          <i className="fas fa-cogs"></i>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
