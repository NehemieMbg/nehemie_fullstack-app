import { Link, Form, useOutletContext } from 'react-router-dom';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import JobInfo from './JobInfo';
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  //   EllipsisHorizontalCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';

dayjs.extend(advancedFormat);

interface JobProps {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: Date;
  jobStatus: string;
}

const Job: React.FC<JobProps> = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const { isLightTheme } = useOutletContext() as { isLightTheme: boolean };
  const date = dayjs(createdAt).format('MMM Do YYYY');

  const statusStyle = (jobStatus: string) => {
    if (jobStatus === 'pending') return 'text-orange-400 bg-orange-400';
    else if (jobStatus === 'interview') return 'bg-green-400 text-green-400';
    else if (jobStatus === 'declined') return 'text-red-400 bg-red-500';
  };

  return (
    <div
      className={`p-6 bg-dark-gray rounded-3xl font-roboto
    ${isLightTheme ? 'bg-neutral-300' : ''}
    `}
    >
      <header className="relative flex gap-4 border-b-[1px] border-b-zinc-700 pb-5 mb-4">
        <div className="h-10 w-10 flex items-center justify-center bg-purple-500 aspect-square rounded-2xl uppercase font-normal">
          {company.charAt(0)}
        </div>
        <div className="leading-5">
          <h5 className="font-normal">
            {position.charAt(0).toUpperCase() + position.slice(1)}
          </h5>
          <p className="text-sm font-light text-light-gray">
            {company.charAt(0).toUpperCase() + company.slice(1)}
          </p>
        </div>
      </header>

      <div className="">
        <div className="flex flex-col gap-3">
          <JobInfo
            icon={<MapPinIcon className="h-5 text-light-gray" />}
            text={jobLocation}
          />
          <JobInfo
            icon={<BriefcaseIcon className="h-5 text-light-gray" />}
            text={jobType}
          />
          <JobInfo
            icon={<CalendarDaysIcon className="h-5 text-light-gray" />}
            text={date}
          />

          <div
            className={`mt-3 w-max px-3  rounded-lg bg-opacity-30    ${statusStyle(
              jobStatus
            )}`}
          >
            {jobStatus}
          </div>
        </div>

        <footer className="flex gap-4 w-max ml-auto mt-6">
          <Link
            to={`../edit-job/${_id}`}
            className="text-light-gray hover:text-inherit transition-colors duration-200"
          >
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button
              type="submit"
              className="text-light-gray hover:text-red-500 transition-colors duration-200"
            >
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </div>
  );
};
export default Job;
