import { useAllJobsContext } from '../../pages/AllJobs';
import { PageBtnContainer } from '..';
import Job from './Job';

const JobsContainer = () => {
  const { data } = useAllJobsContext() as any;
  const { totalJobs, numOfPages } = data;

  const jobs = data.data;

  if (jobs?.length === 0) {
    return <div>No jobs found</div>;
  }

  return (
    <div className="w-full">
      <div className="max-w-screen-wide mx-auto">
        <h4 className="mb-6 text-xl font-normal font-ubuntu max-md:text-lg">
          {totalJobs} job{jobs.length > 1 && 's'} found.
        </h4>
        <div className=" grid grid-cols-3 gap-6 max-[1350px]:grid-cols-2 max-[800px]:grid-cols-1 mb-12">
          {jobs?.map((job: any) => (
            <Job key={job._id} {...job} />
          ))}
        </div>
        <div className="w-full flex md:justify-end justify-center font-normal">
          {numOfPages > 1 && <PageBtnContainer />}
        </div>
      </div>
    </div>
  );
};
export default JobsContainer;
