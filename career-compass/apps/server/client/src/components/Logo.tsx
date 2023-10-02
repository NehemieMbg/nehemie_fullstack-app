import { Link } from 'react-router-dom';

const Logo = (props: { className?: string }) => {
  const { className } = props;

  return (
    <Link
      to={'/'}
      className={`text-white flex gap-2 items-center font-ubuntu font-light text-xl
	 	${className ? `${className}` : ''} 
	  `}
    >
      <img src="/logo-white.png" alt="Career Compass logo" className="h-16" />
      <p className="max-sm:hidden">Career Compass</p>
    </Link>
  );
};
export default Logo;
