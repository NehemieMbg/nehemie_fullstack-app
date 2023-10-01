import { ChartContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  try {
    const response = await customFetch('/jobs/stats');
    return response.data;
  } catch (error) {
    return error;
  }
};

interface Data {
  defaultStats: {
    pending: number;
    interview: number;
    declined: number;
  };
  monthlyApplication: { date: string; count: number }[];
}

const Stats = () => {
  const { defaultStats, monthlyApplication } = useLoaderData() as Data;

  return (
    <section className="w-full">
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplication?.length > 1 && (
        <ChartContainer data={monthlyApplication} />
      )}
    </section>
  );
};
export default Stats;
