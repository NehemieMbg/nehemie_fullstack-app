import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error: unknown = useRouteError(); // to get access to the error object

  // Using typeof to check if error is an object and has a status property
  if (typeof error === 'object' && error !== null && 'status' in error) {
    if (error.status === 404) {
      return (
        <div className="h-screen flex flex-col gap-4 items-center justify-center text-white p-16">
          <img src="/page-not-found.svg" height={200} width={200} />
          <h3 className="text-2xl font-ubuntu text-center">
            Oops! Page Not Found
          </h3>
          <p className="text-light-gray font-thin max-w-lg text-center">
            We're sorry, but we can't find the page you're looking for. It might
            have been moved, deleted, or never existed. Please check the URL and
            try again, or use the navigation to explore other areas of our site.
          </p>
          <Link
            to={'/dashboard'}
            className="font-light text-light-purple underline hover:text-neutral-purple transition-colors duration-200"
          >
            Return home
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <h1>something went wrong</h1>
    </div>
  );
};
export default Error;
