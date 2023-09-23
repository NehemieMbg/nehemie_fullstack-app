import { Link } from 'react-router-dom';
import AuthInputForm from '../components/authForm/AuthInputForm';
import Logo from '../components/Logo';
import ReviewSlider from '../components/animated/ReviewSlider';

const Register = () => {
  return (
    <section className=" h-screen grid grid-cols-2 gap-8 text-white font-light p-10 max-xl:px-16 max-lg:px-12 max-md:px-8 max-w-screen-wide w-full mx-auto">
      <div className="bg-[url('/images/wallpaper/dark-sand.jpg')] bg-cover w-full  rounded-3xl overflow-hidden">
        <div className="flex flex-col items-center justify-center h-full bg-zinc-950 bg-opacity-20    backdrop-blur-md">
          <div className="">
            <h1 className="font-ubuntu font-light text-5xl mb-8 max-[1450px]:text-9xl leading-tight">
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

      <form action="">
        <Logo />
        <AuthInputForm type="text" name="name" defaultValue="jhon" />

        <p>Forgot password ?</p>
        <button>Login</button>
        <div>
          <p>Already have an account ?</p>
          <Link to={'/login'}>Log In</Link>
        </div>
      </form>
    </section>
  );
};
export default Register;
