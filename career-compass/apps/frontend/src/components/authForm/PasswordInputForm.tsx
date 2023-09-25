import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface PasswordInputProps {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

const PasswordInputForm: React.FC<PasswordInputProps> = ({
  type,
  name,
  defaultValue,
  required,
  placeholder,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="relative w-full h-12">
      <label htmlFor={name}></label>
      <input
        type={isPasswordVisible ? 'text' : type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full h-full outline-none text-cool-gray font-ubuntu rounded-2xl py-2 px-4 bg-inherit border border-light-gray"
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
    </div>
  );
};
export default PasswordInputForm;
