interface JobInfoProps {
  icon: React.ReactNode;
  text: string;
}

const JobInfo: React.FC<JobInfoProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-3 font-light">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
};
export default JobInfo;
