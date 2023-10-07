import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { ActionFunctionArgs, useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { AxiosError } from 'axios';

export const loader = async ({ request }: ActionFunctionArgs) => {
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

type AllJobsContextType = {
  data: {
    numOfPages: number;
    currentPage: number;
    totalJobs: number;
    data: {
      company: string;
      createdAt: string;
      createdBy: string;
      jobLocation: string;
      jobStatus: string;
      jobType: string;
      position: string;
      updatedAt: string;
      _id: string;
    }[];
  };
  searchValues: {
    search: string;
    jobType: string;
    jobStatus: string;
    sort: string;
  };
};

const AllJobsContext = createContext({} as AllJobsContextType);

const AllJobs = () => {
  const { data, searchValues } = useLoaderData() as AllJobsContextType;

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
