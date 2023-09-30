import { Form, useSubmit, Link, useOutletContext } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../constants';
import { useAllJobsContext } from '../../pages/AllJobs';
import { SearchInputForm } from '..';
import SelectForm from '../FormInputs/SelectForm';

const SearchContainer = () => {
  const { isLightTheme } = useOutletContext() as { isLightTheme: boolean };
  // Getting searchValues from AllJobsContext
  // to avoid reset to default values when reloading the page
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  const submit = useSubmit(); // react-router-dom to submit form with query params
  return (
    <div className="max-w-screen-wide mx-auto mb-12">
      <h4 className="mb-6 text-xl font-normal font-ubuntu max-md:text-lg">
        My Applications
      </h4>
      <Form>
        <div className="mb-6">
          <SearchInputForm
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectForm
            label="Job Status"
            name="jobStatus"
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            list={['all', ...Object.values(JOB_STATUS)]}
          />
          <SelectForm
            label="Job Type"
            name="jobType"
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            list={['all', ...Object.values(JOB_TYPE)]}
          />
          <SelectForm
            label="Sort By"
            name="sort"
            defaultValue={sort}
            className="w-[100px] flex"
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            list={[...Object.values(JOB_SORT_BY)]}
          />
          <Link
            to="/dashboard/all-jobs"
            className={`col-start-3 justify-self-end text-base font-roboto font-light text-light-gray hover:text-white transition-colors duration-200
            ${isLightTheme ? 'text-neutral-700' : ''}
            `}
          >
            Reset search
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default SearchContainer;
