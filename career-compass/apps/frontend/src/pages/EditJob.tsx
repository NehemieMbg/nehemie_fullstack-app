import {
  ActionFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../constants';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { AxiosError } from 'axios';
import { User } from '../types/userType';
import { InputFormJob, SelectFrom } from '../components';
import { useEffect, useState } from 'react';
import { addJobError } from '../utils/errorInput';

export const loader = async ({ params }: any) => {
  // params is the id of the job
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return { data: data.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      redirect('/dashboard/all-jobs');
      return error?.response?.data?.message;
    }
    return error;
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data?.message;
    }
    return error;
  }
};

const EditJob = () => {
  const { data } = useLoaderData() as any;

  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const { isLightTheme } = useOutletContext() as {
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
    <div className="py-8 w-full max-w-[680px] font-roboto">
      <div
        className={`relative w-full max-w-screen-wide rounded-3xl max-lg:rounded-2xl max-md-rounded-xl p-6 max-lg:p-6 max-md:p-4 bg-dark-gray text-white
  ${isLightTheme ? '' : ''}
`}
      >
        <Form method="patch" action="" className="">
          <h4
            className={`font-light text-2xl mb-8 max-lg:text-xl max-lg:mb-6 
      `}
          >
            Update Your Submitted Job
            <br /> Application Information
          </h4>

          <div className="mb-2 flex flex-col gap-2">
            <InputFormJob
              type="text"
              name="position"
              placeholder="Position"
              className={''}
              defaultValue={data.position}
              error={errorInput.position}
            />
            <InputFormJob
              type="text"
              name="company"
              placeholder="Company"
              className={''}
              defaultValue={data.company}
              error={errorInput.company}
            />
            <InputFormJob
              type="text"
              name="jobLocation"
              placeholder="Job Location (e.g. Paris, France)"
              defaultValue={data.jobLocation}
              className={''}
              error={errorInput.jobLocation}
            />
          </div>
          <div className="flex gap-2 mb-6">
            <SelectFrom
              name="jobStatus"
              defaultValue={data.jobStatus}
              list={Object.values(JOB_STATUS)}
              className={''}
            />
            <SelectFrom
              name="jobType"
              defaultValue={data.jobType}
              list={Object.values(JOB_TYPE)}
              className={''}
            />
          </div>
          <div className="w-full">
            <button
              className={`py-1 px-3 ml-auto rounded-lg font-roboto  transition-colors duration-200  bg-purple-500 text-purple-300 bg-opacity-50  hover:bg-opacity-70 `}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting' : 'Save Changes'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default EditJob;
