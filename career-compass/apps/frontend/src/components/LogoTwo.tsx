import { Link } from 'react-router-dom';

const LogoTwo = (props: { className?: string }) => {
  const { className } = props;

  return (
    <Link
      to={'/'}
      className={`
	 	${className ? `${className}` : ''} 
	  `}
    >
      <img src="/logo-white.png" alt="Career Compass logo" className="h-10" />
    </Link>
  );
};
export default LogoTwo;
