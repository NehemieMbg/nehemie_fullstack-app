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

  return (
    <div className=" w-full font-roboto">
      <div
        className={`mx-auto relative w-full max-w-screen-wide rounded-3xl max-lg:rounded-2xl max-md-rounded-xl text-white
      ${isLightTheme ? '' : ''}
    `}
      >
        <h4 className="mb-6 text-xl font-ubuntu max-md:text-lg">
          Submit Details of a New Application
        </h4>

        <Form
          method="post"
          action=""
          className="w-full gap-x-80 max-[1271px]:gap-x-56 max-[900px]:flex-col"
        >
          <div className="grid grid-cols-2 max-[720px]:grid-cols-1 mb-4 gap-2 gap-y-3">
            <InputFormJob
              type="text"
              name="position"
              label="Position"
              className={''}
              error={errorInput.position}
            />
            <InputFormJob
              type="text"
              name="company"
              label="Company"
              className={''}
              error={errorInput.company}
            />
            <InputFormJob
              type="text"
              name="jobLocation"
              label="Job Location (e.g. Paris, France)"
              defaultValue={user.location}
              className={''}
              error={errorInput.jobLocation}
            />
            <div className="flex gap-2 mb-2">
              <SelectFrom
                name="jobStatus"
                defaultValue={JOB_STATUS.PENDING}
                list={Object.values(JOB_STATUS)}
                label="Job Status"
                className={''}
              />
              <SelectFrom
                name="jobType"
                defaultValue={JOB_TYPE.FULL_TIME}
                list={Object.values(JOB_TYPE)}
                label="Job Type"
                className={''}
              />
            </div>
          </div>
          <div className="w-full flex">
            <button
              className={`ml-auto py-1 px-3 transition-colors duration-200 text-purple-400 bg-opacity-50  hover:bg-opacity-70 `}
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
