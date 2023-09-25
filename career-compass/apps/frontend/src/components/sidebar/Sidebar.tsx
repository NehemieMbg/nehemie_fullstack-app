import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { LogoTwo } from '..';
import { Link } from 'react-router-dom';
import { useDashboardContext } from '../../pages/DashboardLayout';
import links from '../../utils/links';

const Sidebar = () => {
  const { toggleSideBar } = useDashboardContext();

  return (
    <div className={'h-sidebar font-light p-8 z-30'}>
      <LogoTwo />

      <div className="mt-14 flex flex-col justify-between h-full">
        <div className=" flex flex-col gap-4">
          {links.map((link) => (
            <Link
              to={link.path}
              key={link.path}
              className="flex items-center gap-2 hover:bg-zinc-900 transition-colors duration-200 py-2 px-3 rounded-xl "
              onClick={toggleSideBar}
            >
              {link.icon}
              <p>{link.text}</p>
            </Link>
          ))}
        </div>

        <div>
          <Link
            to={''}
            className="flex items-center gap-2 hover:bg-zinc-900 transition-colors duration-200 py-2 px-3 rounded-xl "
          >
            <ArrowRightOnRectangleIcon className="h-5" />
            <p>Log out</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
