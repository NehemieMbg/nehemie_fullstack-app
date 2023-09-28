import {
  useOutletContext,
  Form,
  useNavigation,
  redirect,
} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { JOB_STATUS, JOB_TYPE } from '../constants';
import { SelectFrom, InputForm } from '../components';
import { User } from '../types/userType';

const AddJob = () => {
  const { user } = useOutletContext() as { user: User };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="w-full bg-zinc-900 rounded-3xl p-8 max-lg:p-6 max-md:p-4">
      <Form method="post" action="" className="text-white">
        <h4 className="font-ubuntu text-4xl  text-white mb-10">
          Submit Details of a New
          <br />
          Application
        </h4>

        <div className="flex gap-10 mb-8">
          <InputForm
            type="text"
            name="position"
            placeholder="Position"
            className=""
          />
          <InputForm
            type="text"
            name="company"
            placeholder="Company"
            className=""
          />
          <InputForm
            type="text"
            name="jobLocation"
            placeholder="Job Location (e.g. Paris, France)"
            defaultValue={user.location}
            className=""
          />
        </div>
        <div className="flex gap-8">
          <SelectFrom
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <SelectFrom
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />

          <button
            className="bg-light-purple w-full py-3 rounded-2xl font-ubuntu font-normal hover:bg-neutral-purple transition-colors duration-200 text-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting' : 'Add Job'}
          </button>
        </div>
      </Form>
    </div>
  );
};
export default AddJob;
