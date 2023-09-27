import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';
import { createContext, useContext, useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

interface DashboardContextType {
  user: { name: string; image: string };
  isLightTheme: boolean;
  isSidebar: boolean;
  toggleSideBar: () => void;
  toggleDarkTheme: () => void;
  logoutUser: () => void;
}
const DashboardContext = createContext<DashboardContextType>({
  isLightTheme: false,
  isSidebar: false,
  user: { name: '', image: '' },
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
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // temp
  const user = { name: 'John Doe', image: '' };
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
    // console.log('Logout user');
  };

  useClickOutside(sidebarRef, () => setSidebar(false));

  return (
    <DashboardContext.Provider
      value={{
        user,
        isLightTheme,
        isSidebar,
        toggleSideBar,
        toggleDarkTheme,
        logoutUser,
      }}
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
            <Outlet />
          </div>
        </div>
      </main>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
