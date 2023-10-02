import { useDashboardContext } from '../../pages/DashboardLayout';

const Logout = () => {
  const { user, isLightTheme } = useDashboardContext();

  return (
    <div className={`flex items-center gap-4 px-4`}>
      <div className="text-base font-light max-md:hidden">
        <p>
          Hi, {user.name} {user.lastName}
        </p>
      </div>

      {user.avatar ? (
        <img
          src={user.avatar}
          alt={'avatar'}
          className="h-8 w-8 aspect-square rounded-full object-cover"
        />
      ) : (
        <div
          className={`h-8 w-8 aspect-square rounded-full 
          ${isLightTheme ? 'bg-zinc-400' : 'bg-zinc-800'}`}
        ></div>
      )}
    </div>
  );
};
export default Logout;
