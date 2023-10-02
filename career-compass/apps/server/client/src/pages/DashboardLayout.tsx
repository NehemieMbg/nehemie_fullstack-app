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
    avatar: '',
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
    await customFetch.get('/auth/logout');
    navigate('/');
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
      ${isLightTheme ? 'bg-neutral-100 text-black' : 'bg-neutral-950 '}
      `}
      >
        <div
          className={`fixed top-0 z-40 w-screen h-screen min-[1050px]:hidden bg-opacity-20 backdrop-blur-[3px]
        ${isSidebar ? 'bg-neutral-950' : 'hidden'}
        `}
        ></div>
        <div
          className={`h-screen max-[1050px]:translate-x-[-100%] max-[1050px]:fixed transition-transform duration-200 w-[224px]  z-40
          ${isSidebar ? 'max-[1050px]:translate-x-[0px]' : ''}
          ${isLightTheme ? 'bg-neutral-100' : 'bg-neutral-950 '}
          `}
          ref={sidebarRef}
        >
          <Sidebar />
        </div>

        <div className="relative w-full ">
          <Navbar />

          <div className=" p-8  max-lg:p-6 max-md:p-4 font-light py-[40px]">
            <Outlet context={{ user, isLightTheme }} />
          </div>
        </div>
      </main>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
