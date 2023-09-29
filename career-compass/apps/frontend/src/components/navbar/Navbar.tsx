import { Bars3Icon } from '@heroicons/react/24/solid';
import { useDashboardContext } from '../../pages/DashboardLayout';
import Logout from './Logout';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { toggleSideBar, isLightTheme } = useDashboardContext();

  return (
    <div
      className={`sticky top-0 z-30 p-8 max-md:p-4 bg-zinc-950 w-full flex items-center justify-between font-roboto
    `}
    >
      <div className="flex items-center gap-4">
        <div
          className={`cursor-pointer min-[1050px]:hidden p-1 rounded-md transition-colors duration-200
          ${isLightTheme ? 'hover:bg-zinc-300' : ''}
          `}
          onClick={toggleSideBar}
        >
          <Bars3Icon
            className={`h-6 transition-colors duration-200
            ${isLightTheme ? '' : 'hover:fill-light-gray'}
          `}
          />
        </div>
      </div>

      <div className="relative flex items-center gap-4">
        <ThemeToggle />
        <Logout />
      </div>
    </div>
  );
};
export default Navbar;
