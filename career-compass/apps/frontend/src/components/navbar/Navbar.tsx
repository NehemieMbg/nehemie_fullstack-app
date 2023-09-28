import { Bars3Icon } from '@heroicons/react/24/solid';
import { useDashboardContext } from '../../pages/DashboardLayout';
import { useLocation } from 'react-router-dom';
import Logout from './Logout';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const pathArray = location.pathname.split('/')[2];
  let pathname = 'Add Job';

  if (pathArray === 'all-jobs') pathname = 'Overview';
  if (pathArray === 'stats') pathname = 'Stats';
  if (pathArray === 'profile') pathname = 'Profile';
  if (pathArray === 'admin') pathname = 'Admin';

  const { toggleSideBar, isLightTheme } = useDashboardContext();

  return (
    <div
      className={`w-full flex items-center justify-between font-roboto
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
        <h2 className="text-xl font-ubuntu font-normal">{pathname}</h2>
      </div>

      <div className="relative flex items-center gap-4">
        <ThemeToggle />
        <Logout />
      </div>
    </div>
  );
};
export default Navbar;
