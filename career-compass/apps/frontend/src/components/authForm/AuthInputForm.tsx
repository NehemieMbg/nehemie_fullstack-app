interface AuthInputProps {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
}

const AuthInputForm: React.FC<AuthInputProps> = ({
  type,
  name,
  label,
  defaultValue,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label || name}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
};
export default AuthInputForm;
