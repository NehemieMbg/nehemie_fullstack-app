import { Link, useNavigate } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';
import Logo from '../components/Logo';
import customFetch from '../utils/customFetch';
import { AxiosError } from 'axios';

const Landing = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };

    try {
      await customFetch.post('/auth/login', data, {
        withCredentials: true,
      });
      return navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        return error?.response?.data?.message;
      }
      return error;
    }
  };
  return (
    <section className="relative p-10 px-20 max-xl:px-16 max-lg:px-12 max-md:px-8 h-screen bg-zinc-950 text-zinc-200 display-grid ">
      <nav className="w-full flex items-center justify-between justify-self-start">
        <Logo />

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
            <button
              onClick={loginDemoUser}
              className="flex items-center gap-2 border border-white py-3 px-6 rounded-lg hover:text-light-gray hover:border-white text-white transition-colors duration-200"
            >
              <PlayIcon className="fill-transparent stroke-white h-4" />
              <p>Demo</p>
            </button>
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
