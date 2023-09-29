import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { AxiosError } from 'axios';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs');
    return { data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data?.message;
    }
    return error;
  }
};

const AllJobsContext = createContext({
  data: {
    jobs: [],
  },
});

const AllJobs = () => {
  const { data } = useLoaderData() as any;

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
