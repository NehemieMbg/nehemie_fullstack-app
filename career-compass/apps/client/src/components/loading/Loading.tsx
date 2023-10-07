interface LoadingProps {
  isLightTheme: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLightTheme }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`spinner w-8 h-8 border-t-2 border-white rounded-full animate-spin
	 	${isLightTheme ? 'border-black' : 'border-white'} 
	  `}
      ></div>
    </div>
  );
};
export default Loading;
