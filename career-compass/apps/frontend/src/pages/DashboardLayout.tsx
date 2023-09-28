import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';
import { createContext, useContext, useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import customFetch from '../utils/customFetch';
import { User } from '../types/userType';
import { DashboardContext as DashboardContextType } from '../types/dashboardType';

// redirect if we cannot get hold of the user to the homepage
export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext<DashboardContextType>({
  isLightTheme: false,
  isSidebar: false,
  user: {
    email: '',
    name: '',
    image: '',
    lastName: '',
    location: '',
    _id: '',
    role: '',
  },
  logoutUser: () => {},
  toggleDarkTheme: () => {},
  toggleSideBar: () => {},
});

const checkDefaultTheme = () => {
  const isLightTheme = localStorage.getItem('light-theme') === 'true';
  document.body.classList.toggle('light-theme', isLightTheme);
  return isLightTheme;
};

const DashboardLayout = () => {
  const { user } = useLoaderData() as { user: User };
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const [isSidebar, setSidebar] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(checkDefaultTheme);

  const toggleSideBar = () => {
    setSidebar((prev) => {
      if (prev === false) return true;
      return false;
    });
  };

  const toggleDarkTheme = () => {
    const newLightTheme = !isLightTheme;
    setIsLightTheme(newLightTheme);
    document.body.classList.toggle('light-theme', newLightTheme);
    localStorage.setItem('light-theme', JSON.stringify(newLightTheme));
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
  };

  useClickOutside(sidebarRef, () => setSidebar(false));

  return (
    <DashboardContext.Provider
      value={
        {
          user,
          isLightTheme,
          isSidebar,
          toggleSideBar,
          toggleDarkTheme,
          logoutUser,
        } as DashboardContextType
      }
    >
      <main
        className={`flex gap-4 max-[1050px]:gap-0 w-screen min-h-screen
      ${isLightTheme ? 'bg-cool-gray text-black' : 'bg-zinc-950 '}
      `}
      >
        <div
          className={`fixed top-0 w-screen h-screen min-[1050px]:hidden bg-opacity-30 backdrop-blur-[2px] z-10
        ${isSidebar ? 'bg-zinc-700' : 'hidden'}
        `}
        ></div>
        <div
          className={`h-screen  max-[1050px]:translate-x-[-100%] max-[1050px]:absolute transition-transform duration-200 w-[250px]  z-40
          ${isSidebar ? 'max-[1050px]:translate-x-[0px]' : ''}
          ${isLightTheme ? 'bg-cool-gray' : 'bg-zinc-950 '}
          `}
          ref={sidebarRef}
        >
          <Sidebar />
        </div>

        <div className=" w-full p-8 max-lg:p-6 max-md:p-4">
          <Navbar />

          <div className="py-[40px] font-light">
            <Outlet context={{ user, isLightTheme }} />
          </div>
        </div>
      </main>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
