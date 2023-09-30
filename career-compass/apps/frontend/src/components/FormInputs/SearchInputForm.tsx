import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

interface InputProps {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputForm: React.FC<InputProps> = ({
  type,
  name,
  defaultValue,
  required,
  error,
  className,
  onChange,
}) => {
  const [triggered, setTriggered] = useState(false);
  const { isLightTheme } = useOutletContext() as { isLightTheme: boolean };

  return (
    <div className="relative w-full">
      <label htmlFor={name} className="text-light-gray"></label>
      {!triggered && (
        <MagnifyingGlassIcon className="absolute top-[15px] left-5 h-[19px] text-light-gray" />
      )}
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        onChange={(e) => {
          setTriggered(() => {
            if (e.target.value.length > 0) return true;
            return false;
          });
          onChange(e);
        }}
        placeholder={`Search In Your applications`}
        className={`w-full bg-dark-gray p-2 px-4 rounded-md outline-none font-roboto placeholder-light-gray mt-1 placeholder:pl-8
		${isLightTheme ? '' : ''}
        ${error ? 'border-red-500' : ` ${className} border-transparent`} 
        `} // Using className as the else statement to add the red borders on error
      />
      {error && (
        <p className="flex gap-2 font-roboto font-light px-2 mt-2 text-red-500">
          <span>
            <ExclamationCircleIcon className="h-5 mt-[1px]" />
          </span>
          {error}
        </p>
      )}
    </div>
  );
};
export default SearchInputForm;
