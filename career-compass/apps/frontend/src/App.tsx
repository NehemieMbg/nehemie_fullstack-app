import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true, // the the content of a page to '/'
        element: <Landing />,
      },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'dashboard', element: <DashboardLayout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
