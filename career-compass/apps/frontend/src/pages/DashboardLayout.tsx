import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';
import { createContext, useContext, useState } from 'react';

interface DashboardContextType {
  user: { name: string };
  isDarkTheme: boolean;
  isSidebar: boolean;
  toggleSideBar: () => void;
  toggleDarkTheme: () => void;
  logoutUser: () => void;
}
const DashboardContext = createContext<DashboardContextType>();

const DashboardLayout = () => {
  // temp
  const user = { name: 'John Doe' };
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSidebar, setSidebar] = useState(false);

  const toggleSideBar = () => {
    setSidebar((prev) => {
      console.log(prev);
      if (prev === false) return true;
      return false;
    });
    console.log('Toggle sidebar');
  };

  const toggleDarkTheme = () => {
    console.log('Toggle dark theme');
  };

  const logoutUser = async () => {
    console.log('Logout user');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarkTheme,
        isSidebar,
        toggleSideBar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <main className="flex gap-4 max-[1050px]:gap-0 w-screen min-h-screen">
        <div
          className={`fixed top-0 w-screen h-screen min-[1050px]:hidden bg-opacity-30 backdrop-blur-[2px] z-10
        ${isSidebar ? 'bg-zinc-700' : 'hidden'}
        `}
          onClick={toggleSideBar}
        ></div>
        <div
          className={`h-screen bg-zinc-950 max-[1050px]:translate-x-[-100%] max-[1050px]:absolute transition-transform duration-200 w-[250px] max-w-[1350px]:w-0 z-40
          ${isSidebar ? 'max-[1050px]:translate-x-0' : ''}
          `}
        >
          <Sidebar />
        </div>

        <div className=" w-full p-8 max-lg:p-6 max-md:p-4">
          <Navbar />

          <div className="py-[40px]">
            <Outlet />
          </div>
        </div>
      </main>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
