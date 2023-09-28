import { User } from './userType';

export interface DashboardContext {
  user: User;
  isLightTheme: boolean;
  isSidebar: boolean;
  toggleSideBar: () => void;
  toggleDarkTheme: () => void;
  logoutUser: () => void;
}
