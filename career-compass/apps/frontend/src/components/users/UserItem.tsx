import {
  EnvelopeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { User } from '../../types/userType';

interface UserProps {
  user: User;
}

const UserItem: React.FC<UserProps> = ({ user }) => {
  return (
    <div
      key={user._id}
      className="bg-dark-gray rounded-xl overflow-hidden p-6 "
    >
      <div className="flex gap-4 pb-4 mb-4 border-b-[1px] border-b-zinc-700">
        {user.image ? (
          <img src="" alt="" className="w-12 h-12 aspect-square rounded-xl" />
        ) : (
          <div className="w-12 h-12  bg-neutral-700 rounded-xl aspect-square"></div>
        )}
        <div className="leading-5">
          <p className="text-lg">
            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{' '}
            {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
          </p>
          <p className="text-light-gray text-sm">{user._id}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="flex gap-3">
          <span>
            <EnvelopeIcon className="h-5 text-light-gray" />
          </span>
          {user.email.toLocaleLowerCase()}
        </p>
        <p className="flex gap-3">
          <span>
            <MapPinIcon className="h-5 text-light-gray" />
          </span>
          {user.location}
        </p>
        <p className="flex gap-3">
          <span>
            {user.role === 'user' ? (
              <UsersIcon className="h-5 text-light-gray" />
            ) : (
              <ShieldCheckIcon className="h-5 text-light-gray" />
            )}
          </span>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>
    </div>
  );
};
export default UserItem;
