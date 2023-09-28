import { useAllJobsContext } from '../../pages/AllJobs';
import Job from './Job';

const JobsContainer = () => {
  const { data } = useAllJobsContext() as any;
  const { data: jobs } = data;

  if (jobs?.length === 0) {
    return <div>No jobs found</div>;
  }

  return (
    <div className="w-full">
      <div className=" max-w-screen-wide mx-auto grid grid-cols-4 gap-6 max-[1750px]:grid-cols-3 max-[1350px]:grid-cols-2 max-[800px]:grid-cols-1">
        {jobs?.map((job: any) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </div>
  );
};
export default JobsContainer;
