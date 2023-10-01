import { useState } from 'react';
import { AreaChart, BarChart } from '..';
import { useOutletContext } from 'react-router-dom';

interface ChartContainerProps {
  data: { date: string; count: number }[];
}

const ChartContainer: React.FC<ChartContainerProps> = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  const { isLightTheme } = useOutletContext() as { isLightTheme: boolean };
  return (
    <div className="max-w-screen-wide mx-auto">
      <h4 className="mb-6 text-xl font-normal font-ubuntu max-md:text-lg">
        Monthly Applications
      </h4>

      <div
        className={`w-2/3 max-[1050px]:w-full flex flex-col justify-center bg-dark-gray rounded-xl p-6 pl-0 pb-0
        ${isLightTheme ? 'bg-neutral-300' : ''}
      `}
      >
        <button
          type="button"
          onClick={() => setBarChart((prev) => !prev)}
          className={`ml-6 text-sm font-normal  w-max flex gap-2 p-1 rounded-full font-ubuntu mb-6
    ${isLightTheme ? 'bg-neutral-400' : 'bg-neutral-950'}
          `}
        >
          {/* {barChart ? 'Bar Chart' : 'Area Chart'} */}
          <span
            className={`py-1 px-2 rounded-full transition-colors duration-300
		 	${barChart ? 'bg-purple-600 text-neutral-950' : ''} 
		  `}
          >
            Area Chart
          </span>
          <span
            className={`py-1 px-2 rounded-full  transition-colors duration-300
		 	${barChart ? '' : 'bg-purple-500 text-neutral-950'}  
		  `}
          >
            Bar Chart
          </span>
        </button>
        <div className=" mb-12">
          {barChart ? <AreaChart data={data} /> : <BarChart data={data} />}
        </div>
      </div>
    </div>
  );
};
export default ChartContainer;
