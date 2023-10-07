import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { StatsItem } from '../components';
import { User } from '../types/userType';
import {
  ArchiveBoxIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import UserItem from '../components/users/UserItem';

export const loader = async () => {
  try {
    const response = await customFetch.get('users/admin/app-stats');
    return response.data;
  } catch (error) {
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { data } = useLoaderData() as { data: any };
  const { users, jobs, numUser, numAdmin } = data as {
    users: User[];
    jobs: number;
    numUser: number;
    numAdmin: number;
  };

  return (
    <section className="w-full">
      <div className="max-w-screen-wide mx-auto">
        <h4 className="mb-6 text-xl font-ubuntu max-md:text-lg">
          App Stats & Users
        </h4>
        <div className="w-full mb-12 grid grid-cols-3 gap-6 max-[1350px]:grid-cols-2 max-[800px]:grid-cols-1">
          <StatsItem
            title={'Current users'}
            count={numUser}
            color=""
            bgColor={''}
            icon={<UsersIcon className="h-5 text-purple-500" />}
          />
          <StatsItem
            title={numAdmin <= 1 ? 'Admin' : 'Admins'}
            count={numAdmin}
            color=""
            bgColor={''}
            icon={<ShieldCheckIcon className="h-5 text-red-400" />}
          />
          <StatsItem
            title={'Total jobs'}
            count={jobs}
            color=""
            bgColor={''}
            icon={<ArchiveBoxIcon className="h-5 text-green-400" />}
          />
        </div>

        <h4 className="mb-6 text-xl font-ubuntu max-md:text-lg">
          List of users
        </h4>

        <div className="grid grid-cols-4 gap-6 max-[1750px]:grid-cols-3 max-[1350px]:grid-cols-2 max-[800px]:grid-cols-1">
          {users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Admin;
