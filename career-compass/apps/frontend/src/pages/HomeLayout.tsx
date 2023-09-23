import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="">
      <Outlet /> {/* The children */}
    </div>
  );
};
export default HomeLayout;
