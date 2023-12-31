import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
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

const InputFormJob: React.FC<InputProps> = ({
  type,
  name,
  defaultValue,
  required,
  placeholder,
  label,
  error,
  className,
  onChange,
}) => {
  const { isLightTheme } = useOutletContext() as { isLightTheme: boolean };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={`text-light-gray
        ${isLightTheme ? 'text-neutral-700' : ''}
      `}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-dark-gray p-2 rounded-md outline-none font-roboto placeholder-light-gray mt-1
		${isLightTheme ? 'bg-neutral-300' : ''}
        ${error ? 'border border-red-500' : ` ${className} border-transparent`} 
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
export default InputFormJob;
