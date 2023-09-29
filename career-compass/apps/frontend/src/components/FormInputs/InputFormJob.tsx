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
}

const InputFormJob: React.FC<InputProps> = ({
  type,
  name,
  defaultValue,
  required,
  placeholder,
  error,
  className,
}) => {
  const { isLightTheme } = useOutletContext() as { isLightTheme: boolean };

  return (
    <div className="w-full">
      <label htmlFor={name}></label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={`w-full outline-none text-inherit font-roboto rounded-xl px-3 py-2 bg-inherit border  bg-neutral-950 bg-opacity-50 font-light placeholder-neutral-500
		${isLightTheme ? 'bg-neutral-400 placeholder-slate-800' : 'text-white'}
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
export default InputFormJob;
