import { InputFormJob } from '../components';
import { useNavigation, useOutletContext, Form } from 'react-router-dom';
// import customFetch from '../utils/customFetch';
import { User } from '../types/userType';
import customFetch from '../utils/customFetch';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if (file && file.size < 50000) {
    return 'Image size too large';
  }

  try {
    await customFetch.patch('/users/update-user', formData);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error?.response?.data?.message;
    }
    return error;
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext() as { user: User };
  const { name, lastName, email, location } = user;
  const [fileName, setFileName] = useState('');

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const handleFileChange = (e) => {
    setFileName(e.target.files[0].name);
  };

  return (
    <section className="w-full">
      <Form
        method="post"
        encType="multipart/form-data"
        className="max-w-screen-wide mx-auto"
      >
        <h4 className="mb-6 text-xl font-normal font-ubuntu max-md:text-lg">
          My Profile
        </h4>

        <div className="w-max flex items-center gap-6 mb-8">
          {user.avatar ? (
            <img
              src={user.avatar}
              className="aspect-square h-16 w-16 bg-dark-gray rounded-full object-cover"
            ></img>
          ) : (
            <div className="aspect-square h-16 w-16 bg-dark-gray rounded-full"></div>
          )}
          <div>
            <label htmlFor="avatar" className="cursor-pointer text-purple-500">
              Change image profile
            </label>
            <p className="text-xs font-normal text-light-gray max-w-[150px] mt-1">
              {fileName
                ? `${fileName.slice(1, 10)}...${fileName.slice(-10)}`
                : 'Image size max 0.5MB'}
            </p>

            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className=" grid grid-cols-2 max-[720px]:grid-cols-1 gap-4">
          <InputFormJob
            type="text"
            name="name"
            defaultValue={name}
            label="Name"
          />
          <InputFormJob
            type="text"
            name="lastName"
            defaultValue={lastName}
            label="Last Name"
          />
          <InputFormJob
            type="email"
            name="email"
            defaultValue={email}
            label="Email"
          />
          <InputFormJob
            type="text"
            name="location"
            defaultValue={location}
            placeholder='e.g. "New York, NY"'
            label="Location"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-max justify-self-end col-start-2 max-[720px]:col-start-1 p-2 text-purple-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </section>
  );
};
export default Profile;
