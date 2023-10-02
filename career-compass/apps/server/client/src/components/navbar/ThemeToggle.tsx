import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useDashboardContext } from '../../pages/DashboardLayout';

const ThemeToggle = () => {
  const { isLightTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <div className="cursor-pointer" onClick={toggleDarkTheme}>
      {isLightTheme ? (
        <MoonIcon className="h-5 fill-neutral-500 hover:fill-neutral-950 transition-colors duration-200" />
      ) : (
        <SunIcon className="h-6 fill-light-gray hover:fill-white transition-colors duration-200" />
      )}
    </div>
  );
};
export default ThemeToggle;
