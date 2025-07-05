import appLogo from '../../../assets/app-icon.svg';

const TopBar = () => {
  return (
    <div className="top-0 left-0 w-full bg-white border-t-1 z-50">
      <div className="flex justify-between items-center py-2 px-8">
        <img
          src={appLogo}
          alt="Logo Aplikasi"
          width={24}
        />

        <i className="fas fa-bell text-xl cursor-pointer text-primary"></i>
      </div>
    </div>
  );
};

export default TopBar;
