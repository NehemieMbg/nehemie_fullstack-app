import { Link } from 'react-router-dom';
import AuthInputForm from '../components/authForm/AuthInputForm';
import Logo from '../components/Logo';
import ReviewSlider from '../components/animated/ReviewSlider';
import PasswordInputForm from '../components/authForm/PasswordInputForm';

const Login = () => {
  return (
    <section className=" h-screen grid grid-cols-2 gap-8 text-white font-light p-10 max-xl:px-16 max-lg:px-12 max-md:px-8 max-w-screen-wide w-full mx-auto max-[1350px]:grid-cols-1">
      <div className="bg-[url('/images/wallpaper/dark-sand.jpg')] bg-cover w-full  rounded-3xl overflow-hidden max-[1350px]:hidden">
        <div className="flex flex-col items-center justify-center h-full bg-zinc-950 bg-opacity-20    backdrop-blur-md">
          <div className="">
            <h1 className="font-ubuntu font-light text-5xl mb-8 leading-tight">
              <span className="text-light-purple ">Simplify</span> and
              <br />
              <span className="text-light-purple ">Oversee</span> Your Job
              <br />
              Applications Effectively.
            </h1>

            <p className="text-light-gray mb-16">
              Career Compass keeps you ahead with instant progress tracking and
              <br />
              detailed evaluation of your applications.
            </p>

            <ReviewSlider />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <form
          action=""
          className="flex flex-col items-center gap-4 w-full max-w-[300px]"
        >
          <div>
            <Logo className="flex-col gap-0 " />
            <p className="mb-2 text-light-gray">Log into your account</p>
          </div>
          <AuthInputForm
            type="email"
            name="email"
            defaultValue="test@gmail.com"
            placeholder="Email"
            required={true}
          />
          <PasswordInputForm
            type="password"
            name="password"
            defaultValue="test1234"
            placeholder="Password"
            required={true}
          />
          <p className="text-sm">Forgot password ?</p>

          <button className="bg-light-purple w-full py-3 px-4 rounded-2xl font-roboto font-normal hover:bg-neutral-purple transition-colors duration-200 text-dark-gray">
            Login
          </button>
          <div className="flex gap-2 text-sm text-light-gray mt-8">
            <p>Don't have an account yet ?</p>
            <Link
              to={'/register'}
              className="font-normal text-white hover:text-light-gray transition-colors duration-100"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Login;
