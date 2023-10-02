import { LogoTwo } from '..';
import { Link } from 'react-router-dom';
import { useDashboardContext } from '../../pages/DashboardLayout';
import { useLocation } from 'react-router-dom';
import links from '../../utils/links';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
  const { toggleSideBar, isLightTheme, user } = useDashboardContext();
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const pathname = pathArray[2] || '.';
  // const pathname = '/dashboard';

  const logoutUser = async () => {
    await fetch('/auth/logout', {
      method: 'GET',
      credentials: 'include', // this corresponds to `withCredentials: true` in Axios
    });
  };

  return (
    <>
      <div
        className={`fixed w-[224px] h-sidebar font-light p-8 z-30  text-light-gray 
          ${isLightTheme ? 'text-neutral-900' : ''}
        `}
      >
        <LogoTwo isLightTheme={isLightTheme} />

        <div className="mt-14 flex flex-col justify-between h-full">
          <div className=" flex flex-col gap-4">
            {links.map((link) => {
              const { role } = user;
              if (link.path === 'admin' && role !== 'admin') return;
              return (
                <Link
                  to={link.path}
                  key={link.path}
                  className={`flex items-center gap-2  hover:bg-neutral-800 hover:text-white transition-colors duration-200 py-2 px-3 rounded-xl
              ${
                link.path === pathname && !isLightTheme
                  ? 'text-white bg-neutral-800'
                  : ''
              }

              ${
                isLightTheme && link.path === pathname
                  ? 'bg-neutral-300 text-black'
                  : ''
              }

              ${isLightTheme ? 'hover:bg-neutral-300 hover:text-black' : ''}
              `}
                  onClick={toggleSideBar}
                >
                  {link.icon}
                  <p>{link.text}</p>
                </Link>
              );
            })}
          </div>
          <Link
            to={''}
            className={`flex items-center gap-2 hover:bg-zinc-900 hover:text-white transition-colors duration-200 py-2 px-3 rounded-xl
            ${isLightTheme ? 'hover:bg-neutral-300 hover:text-black' : ''}
            `}
            onClick={logoutUser}
          >
            <ArrowRightOnRectangleIcon className="h-5" />
            <p>Log out</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
