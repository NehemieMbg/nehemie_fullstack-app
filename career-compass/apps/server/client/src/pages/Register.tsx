import {
  Form,
  redirect,
  useNavigation,
  Link,
  ActionFunctionArgs,
  useActionData,
} from 'react-router-dom';
import InputForm from '../components/FormInputs/InputForm';
import Logo from '../components/Logo';
import ReviewSlider from '../components/animated/ReviewSlider';
import PasswordInputForm from '../components/FormInputs/PasswordInputForm';
import customFetch from '../utils/customFetch';
import { registerError } from '../utils/errorInput';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); // transform FormData into regular object

  try {
    await customFetch.post('/auth/register', data);
    return redirect('/dashboard');
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return error?.response?.data?.message;
    }
    return error;
  }
};

const Register = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // managing errors
  const [errorInput, setErrorInput] = useState({
    name: '',
    lastName: '',
    email: '',
    location: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    if (typeof errors === 'string') setErrorInput(registerError(errors));
  }, [errors]);

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
        <Form
          method="post"
          className="flex flex-col items-center gap-4 w-full max-w-[300px]"
        >
          <div>
            <Logo className="flex-col gap-0 " />
            <p className="mb-2 text-light-gray">Register your account</p>
          </div>
          <InputForm
            type="text"
            name="name"
            placeholder="Name"
            required={true}
            error={errorInput.name}
          />
          <InputForm
            type="text"
            name="lastName"
            placeholder="Last Name"
            required={true}
            error={errorInput.lastName}
          />
          <InputForm
            type="email"
            name="email"
            placeholder="Email"
            required={true}
            error={errorInput.email}
          />
          <InputForm
            type="text"
            name="location"
            placeholder="Location"
            required={true}
            error={errorInput.location}
          />
          <PasswordInputForm
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            error={errorInput.password}
          />
          <PasswordInputForm
            type="password"
            name="passwordConfirm"
            placeholder="Password Confirmation"
            required={true}
            error={errorInput.passwordConfirm}
          />

          {/* <p className="text-sm">Forgot password ?</p> */}
          <button
            className="bg-light-purple w-full py-3 px-4 rounded-2xl font-roboto font-normal hover:bg-neutral-purple transition-colors duration-200 text-dark-gray"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
          <div className="flex gap-2 text-sm text-light-gray mt-8">
            <p>Already have an account ?</p>
            <Link
              to={'/login'}
              className="font-normal text-white hover:text-light-gray transition-colors duration-100"
            >
              Log In
            </Link>
          </div>
        </Form>
      </div>
    </section>
  );
};
export default Register;
