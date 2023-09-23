import { Link } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';

const Landing = () => {
  return (
    <section className="relative p-10 px-20 h-screen bg-zinc-950 text-zinc-200 display-grid max-xl:px-16 max-lg:px-12 max-md:px-8">
      <nav className="w-full flex items-center justify-between justify-self-start">
        <Link
          to={'/'}
          className="text-white flex gap-2 items-center font-ubuntu font-light text-xl"
        >
          <img
            src="/logo-white.png"
            alt="Career Compass logo"
            className="h-16"
          />
          <p className="max-sm:hidden">Career Compass</p>
        </Link>

        <div className="flex items-center gap-10 font-light">
          <Link
            to={'/login'}
            className="text-white hover:text-light-gray transition-colors duration-200"
          >
            Log in
          </Link>
          <Link
            to={'/register'}
            className="py-3 px-6 rounded-lg bg-light-purple text-dark-gray hover:bg-neutral-purple transition-colors duration-200 max-sm:hidden"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <div className=" flex items-center justify-between max-w-[1600px] w-full m-auto">
        <div>
          <div className=" mb-10">
            <h1 className="text-5xl font-ubuntu mb-4 max-[1450px]:text-4xl">
              <span className="text-light-purple">Organize</span> and
              <br />
              <span className="text-light-purple">monitor</span> your job
              <br />
              applications{' '}
              <span className="text-light-purple">effortlessly</span>.
            </h1>

            <p className="text-[15px] text-light-gray max-w-lg font-light max-[1450px]:max-w-lg">
              Turn aspirations into achievements with Career Compass, optimizing
              your job search and securing opportunities.
            </p>
          </div>

          <div className="font-light h-max flex items-center gap-4 ">
            <Link
              to={'/login'}
              className="flex items-center gap-2 border border-white py-3 px-6 rounded-lg hover:text-light-gray hover:border-white text-white transition-colors duration-200"
            >
              <PlayIcon className="fill-transparent stroke-white h-4" />
              <p>Demo</p>
            </Link>
            <Link
              to={'/register'}
              className="py-3 px-6 rounded-lg bg-light-purple text-dark-gray hover:bg-neutral-purple transition-colors duration-200"
            >
              Sign up
            </Link>
          </div>
        </div>

        <img
          src="/landing.png"
          height={600}
          width={600}
          className="max-[1450px]:w-[500px] max-xl:w-[350px] -mt-20 max-lg:hidden"
        />
      </div>
    </section>
  );
};
export default Landing;
