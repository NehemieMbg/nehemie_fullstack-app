import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';
import { ActionFunction } from 'react-router-dom';

export const action: ActionFunction = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data?.message;
    }
  }
  return redirect('/dashboard/all-jobs');
};

const DeleteJob = () => {};
export default DeleteJob;
