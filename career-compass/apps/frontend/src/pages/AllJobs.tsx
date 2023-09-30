import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { AxiosError } from 'axios';

export const loader = async ({ request }) => {
  // Turning query params to an object
  // to be able to pass params (query) to the API
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get('/jobs', { params });
    return { data, searchValues: { ...params } };
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
  const { data, searchValues } = useLoaderData() as any;

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
