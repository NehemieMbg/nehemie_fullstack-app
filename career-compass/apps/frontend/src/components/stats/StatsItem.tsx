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
  return (
    <div
      className={`w-full  bg-dark-gray rounded-xl p-6 font-roboto ${color} ${bgColor}`}
    >
      <header className="flex gap-2 items-center ">
        <span>{icon}</span>
        <span className=" text-white">{count}</span>
        <h5>{title}</h5>
      </header>
    </div>
  );
};
export default StatsItem;
