import {
  useOutletContext,
  Form,
  useNavigation,
  // redirect,
  useActionData,
  ActionFunctionArgs,
} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { JOB_STATUS, JOB_TYPE } from '../constants';
import { SelectFrom, InputForm } from '../components';
import { User } from '../types/userType';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { addJobError } from '../utils/errorInput';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); // transform FormData into regular object

  try {
    await customFetch.post('/jobs', data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data?.message;
    }
    return error;
  }
};

const AddJob = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  // importing data (Context using react-router-dom)
  const { user, isLightTheme } = useOutletContext() as {
    user: User;
    isLightTheme: boolean;
  };

  // managing errors
  const [errorInput, setErrorInput] = useState({
    company: '',
    jobLocation: '',
    position: '',
  });

  useEffect(() => {
    if (typeof errors === 'string') setErrorInput(addJobError(errors));
  }, [errors]);

  // Setting input styles
  const inputClassName = `border-2 border-opacity-70 font-normal ${
    isLightTheme
      ? 'border-white placeholder-zinc-500'
      : 'border-black placeholder-zinc-500'
  }`;

  return (
    <div className="py-8">
      <div
        className={`w-full  rounded-3xl p-10 max-lg:p-6 max-md:p-4
      ${isLightTheme ? 'bg-black text-white' : 'bg-white text-black'}
    `}
      >
        <Form method="post" action="" className="">
          <h4
            className={`font-ubuntu font-normal text-3xl mb-10 max-lg:text-2xl max-lg:mb-6 
          `}
          >
            Submit Details of a New Application
          </h4>

          <div className="flex gap-10 mb-8 max-xl:gap-6 max-lg:gap-4 max-lg:flex-wrap max-lg:mb-4">
            <InputForm
              type="text"
              name="position"
              placeholder="Position"
              className={inputClassName}
              error={errorInput.position}
            />
            <InputForm
              type="text"
              name="company"
              placeholder="Company"
              className={inputClassName}
              error={errorInput.company}
            />
            <InputForm
              type="text"
              name="jobLocation"
              placeholder="Job Location (e.g. Paris, France)"
              defaultValue={user.location}
              className={inputClassName}
              error={errorInput.jobLocation}
            />
          </div>
          <div className="flex gap-10 max-xl:gap-6 max-lg:gap-4 max-lg:flex-wrap">
            <SelectFrom
              name="jobStatus"
              defaultValue={JOB_STATUS.PENDING}
              list={Object.values(JOB_STATUS)}
              className={inputClassName}
            />
            <SelectFrom
              name="jobType"
              defaultValue={JOB_TYPE.FULL_TIME}
              list={Object.values(JOB_TYPE)}
              className={inputClassName}
            />

            <button
              className={`w-full py-3 rounded-2xl font-ubuntu font-normal  transition-colors duration-20 bg-light-purple text-white hover:bg-neutral-purple`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting' : 'Add Job'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default AddJob;
