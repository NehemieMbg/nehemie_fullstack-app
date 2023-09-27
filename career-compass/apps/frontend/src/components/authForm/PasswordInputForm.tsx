import { useState } from 'react';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/solid';

interface PasswordInputProps {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

const PasswordInputForm: React.FC<PasswordInputProps> = ({
  type,
  name,
  defaultValue,
  required,
  placeholder,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="relative w-full">
      <label htmlFor={name}></label>
      <input
        type={isPasswordVisible ? 'text' : type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={`w-full h-12 outline-none text-cool-gray font-ubuntu rounded-2xl py-2 px-4 bg-inherit border border-light-gray
        ${error ? 'border-red-500' : ''}
        `}
      />
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <EyeSlashIcon className="fill-light-gray h-5" />
        ) : (
          <EyeIcon className="fill-light-gray h-5" />
        )}
      </div>
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
export default PasswordInputForm;
