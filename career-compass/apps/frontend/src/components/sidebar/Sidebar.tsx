import { LogoTwo } from '..';
import { Link } from 'react-router-dom';
import { useDashboardContext } from '../../pages/DashboardLayout';
import { useLocation } from 'react-router-dom';
import links from '../../utils/links';

const Sidebar = () => {
  const { toggleSideBar, isLightTheme, user } = useDashboardContext();
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const pathname = pathArray[2] || '.';

  return (
    <div
      className={
        'fixed w-[204px] h-screen font-light p-8 z-30  text-light-gray'
      }
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
                className={`flex items-center gap-2  hover:bg-zinc-900 hover:text-white transition-colors duration-200 py-2 px-3 rounded-xl
              ${link.path === pathname ? 'text-white' : ''}
              ${isLightTheme ? 'bg-cool-gray text-black' : 'bg-zinc-950 '}
              ${
                isLightTheme && link.path === pathname
                  ? 'bg-zinc-900 text-zinc-100'
                  : ''
              }
              `}
                onClick={toggleSideBar}
              >
                {link.icon}
                <p>{link.text}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
