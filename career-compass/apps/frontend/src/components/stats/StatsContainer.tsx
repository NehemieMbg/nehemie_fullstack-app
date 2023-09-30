import {
  ClipboardDocumentCheckIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { StatsItem } from '..';

interface StatsContainerProps {
  defaultStats: {
    pending: number;
    interview: number;
    declined: number;
  };
}

const StatsContainer: React.FC<StatsContainerProps> = ({ defaultStats }) => {
  return (
    <div className="w-full max-w-screen-wide mx-auto">
      <h4 className="mb-6 text-xl font-ubuntu max-md:text-lg">
        Application Stats
      </h4>
      <div className="w-full mb-12 grid grid-cols-3 gap-6 max-[1350px]:grid-cols-2 max-[800px]:grid-cols-1">
        <StatsItem
          title={'Pending applications'}
          count={defaultStats?.pending || 0}
          color=""
          bgColor={''}
          icon={<ClockIcon className="h-5 text-purple-500" />}
        />
        <StatsItem
          title={'Interview Scheduled'}
          count={defaultStats?.interview || 0}
          color=""
          bgColor={''}
          icon={<ClipboardDocumentCheckIcon className="h-5 text-green-400" />}
        />
        <StatsItem
          title={'Declined Applications'}
          count={defaultStats?.declined || 0}
          color=""
          bgColor={''}
          icon={<XMarkIcon className="h-5 text-red-400" />}
        />
      </div>
      {/* 
        <h4 className="mb-6 text-xl font-ubuntu max-md:text-lg">
          List of users
        </h4>

        <div className="grid grid-cols-4 gap-6 max-[1750px]:grid-cols-3 max-[1350px]:grid-cols-2 max-[800px]:grid-cols-1">
          {users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </div> */}
    </div>
  );
};
export default StatsContainer;
