import { Bars3Icon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useDashboardContext } from '../../pages/DashboardLayout';

const Navbar = () => {
  const { toggleSideBar, isDarkTheme, user } = useDashboardContext();
  return (
    <div className="w-full flex items-center justify-between font-roboto">
      <div className="flex items-center gap-4">
        <div
          className="cursor-pointer min-[1050px]:hidden"
          onClick={toggleSideBar}
        >
          <Bars3Icon className="h-6 hover:fill-light-gray transition-colors duration-200 " />
        </div>
        <h1 className="text-2xl font-light">Overview</h1>
      </div>

      <div className="flex items-center gap-6">
        {isDarkTheme ? (
          <div className="cursor-pointer">
            <MoonIcon className="h-5 fill-light-gray hover:fill-white transition-colors duration-200" />
          </div>
        ) : (
          <div className="cursor-pointer">
            <SunIcon className="h-6 fill-light-gray hover:fill-white transition-colors duration-200" />
          </div>
        )}

        <div className="text-base font-light">
          <p>Hi, {user.name}</p>
        </div>
        <img src="" alt="" />
      </div>
    </div>
  );
};
export default Navbar;
