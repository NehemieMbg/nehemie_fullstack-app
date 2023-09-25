import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="font-roboto">
      <Outlet /> {/* The children */}
    </div>
  );
};
export default HomeLayout;
