import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

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

const InputForm: React.FC<InputProps> = ({
  type,
  name,
  defaultValue,
  required,
  placeholder,
  error,
  className,
}) => {
  return (
    <div className="w-full ">
      <label htmlFor={name}></label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={`h-12 w-full outline-none text-inherit font-roboto rounded-2xl py-2 px-4 bg-inherit border border-light-gray
        ${error ? 'border-red-500' : ` ${className}`} 
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
export default InputForm;
