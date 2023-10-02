import { useOutletContext } from 'react-router-dom';

interface StatsItemProps {
  count: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const StatsItem: React.FC<StatsItemProps> = ({
  count,
  title,
  icon,
  color,
  bgColor,
}) => {
  const { isLightTheme } = useOutletContext() as { isLightTheme: boolean };
  return (
    <div
      className={`w-full  bg-dark-gray rounded-xl p-6 font-normal font-roboto ${color} ${bgColor}
      ${isLightTheme ? 'bg-neutral-300' : ''}
      `}
    >
      <header className="flex gap-2 items-center ">
        <span>{icon}</span>
        <span className="">{count}</span>
        <h5>{title}</h5>
      </header>
    </div>
  );
};
export default StatsItem;
