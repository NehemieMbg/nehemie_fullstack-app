import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useClickOutside from '../../hooks/useClickOutside';
import { useDashboardContext } from '../../pages/DashboardLayout';

const Logout = () => {
  const { user, logoutUser, isLightTheme } = useDashboardContext();

  const logoutRef = useRef<HTMLDivElement>(null);
  const [isLogoutActive, setIsLogoutActive] = useState(false);

  useClickOutside(logoutRef, () => setIsLogoutActive(false));

  return (
    <div ref={logoutRef}>
      <div
        className={`flex items-center gap-4 cursor-pointer py-1 px-4 rounded-xl transition-colors duration-250
        ${
          isLightTheme
            ? 'hover:bg-zinc-900 hover:text-white'
            : 'hover:bg-dark-gray '
        }
        `}
        onClick={() => setIsLogoutActive(true)}
      >
        <div className="text-base font-light max-md:hidden">
          <p>Hi, {user.name}</p>
        </div>

        {user.image ? (
          <img src="" alt="" className="h-8 w-8 aspect-square rounded-full" />
        ) : (
          <div
            className={`h-8 w-8 aspect-square rounded-full 
          ${isLightTheme ? 'bg-zinc-400' : 'bg-zinc-800'}`}
          ></div>
        )}

        <div>
          {isLogoutActive ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </div>
      </div>

      {isLogoutActive && (
        <div
          className={`absolute -bottom-16 right-0 bg-dark-gray w-52 rounded-xl p-1
        ${isLightTheme ? 'bg-black' : 'bg-zinc-800'}
        `}
        >
          <Link
            to={''}
            className={`flex items-center gap-2 hover:bg-zinc-900 text-white hover:text-white transition-colors duration-200 py-2 px-3 rounded-xl
            ${isLightTheme ? 'hover:bg-zinc-800' : ''}
            `}
            onClick={logoutUser}
          >
            <ArrowRightOnRectangleIcon className="h-5" />
            <p>Log out</p>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Logout;
