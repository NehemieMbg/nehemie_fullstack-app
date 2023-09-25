interface AuthInputProps {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

const AuthInputForm: React.FC<AuthInputProps> = ({
  type,
  name,
  defaultValue,
  required,
  placeholder,
}) => {
  return (
    <div className="w-full h-12">
      <label htmlFor={name}></label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full h-full outline-none text-cool-gray font-ubuntu rounded-2xl py-2 px-4 bg-inherit border border-light-gray"
      />
    </div>
  );
};
export default AuthInputForm;
