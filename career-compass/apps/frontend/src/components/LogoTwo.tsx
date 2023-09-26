import { Link } from 'react-router-dom';

const LogoTwo = (props: { className?: string; isLightTheme: boolean }) => {
  const { className, isLightTheme } = props;

  return (
    <Link
      to={'/'}
      className={`
	 	${className ? `${className}` : ''} 
	  `}
    >
      {isLightTheme ? (
        <img src="/logo-black.png" alt="Career Compass logo" className="h-14" />
      ) : (
        <img src="/logo-white.png" alt="Career Compass logo" className="h-14" />
      )}
    </Link>
  );
};
export default LogoTwo;
