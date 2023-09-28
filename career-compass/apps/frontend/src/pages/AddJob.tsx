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
import { SelectFrom, InputFormJob } from '../components';
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
  const inputClassName = `border-1 border-opacity-70 font-normal ${
    isLightTheme
      ? 'border-white placeholder-zinc-500'
      : 'border-black placeholder-zinc-500'
  }`;

  return (
    <div className="py-8 w-full font-roboto">
      <div
        className={`relative w-1/3 max-w-screen-wide rounded-3xl max-lg:rounded-2xl max-md-rounded-xl p-6 max-lg:p-6 max-md:p-4
      ${isLightTheme ? 'bg-black text-white' : 'bg-dark-gray text-white'}
    `}
      >
        <Form method="post" action="" className="">
          <h4
            className={`font-light text-2xl mb-8 max-lg:text-xl max-lg:mb-6 
          `}
          >
            Submit Details of a New
            <br />
            Application
          </h4>

          <div className="mb-2 flex flex-col gap-2">
            <InputFormJob
              type="text"
              name="position"
              placeholder="Position"
              className={inputClassName}
              error={errorInput.position}
            />
            <InputFormJob
              type="text"
              name="company"
              placeholder="Company"
              className={inputClassName}
              error={errorInput.company}
            />
            <InputFormJob
              type="text"
              name="jobLocation"
              placeholder="Job Location (e.g. Paris, France)"
              defaultValue={user.location}
              className={inputClassName}
              error={errorInput.jobLocation}
            />
          </div>
          <div className="flex gap-2 mb-6">
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
          </div>
          <div className="w-full">
            <button
              className={`py-1 px-3 ml-auto rounded-lg font-roboto  transition-colors duration-200  bg-purple-500 text-purple-300 bg-opacity-50  hover:bg-opacity-70 `}
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
