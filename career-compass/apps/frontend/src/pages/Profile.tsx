import { InputFormJob } from '../components';
import { useNavigation, useOutletContext, Form } from 'react-router-dom';
// import customFetch from '../utils/customFetch';
import { User } from '../types/userType';
import customFetch from '../utils/customFetch';
import { AxiosError } from 'axios';

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

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <section className="w-full">
      <Form
        method="post"
        encType="multipart/form-data"
        className="max-w-screen-wide mx-auto"
      >
        <h4 className="text-2xl mb-12 font-ubuntu">My Profile</h4>
        <div className="flex gap-x-80 max-[1271px]:gap-x-56 max-[900px]:flex-col w-full ">
          <div className="">
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
                <label
                  htmlFor="avatar"
                  className="cursor-pointer text-purple-500"
                >
                  Change image profile
                </label>
                <p className="text-xs font-normal text-light-gray">
                  Image size max 0.5MB
                </p>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
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
              className="mt-4 w-max ml-auto p-2 text-light-gray hover:text-white transition-colors duration-200"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </Form>
    </section>
  );
};
export default Profile;
