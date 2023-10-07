import { useOutletContext } from 'react-router-dom';

interface SelectProps {
  name: string;
  list: string[];
  defaultValue?: string;
  label?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectForm: React.FC<SelectProps> = ({
  name,
  list,
  defaultValue = '',
  className,
  label,
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
      <select
        name={name}
        id={name}
        onChange={onChange}
        defaultValue={defaultValue}
        className={`w-full bg-dark-gray p-2 rounded-md outline-none font-roboto placeholder-light-gray mt-1
        ${isLightTheme ? 'bg-neutral-300' : ''}
		${className}
		`}
      >
        {list.map((itemValue: any) => (
          <option key={itemValue} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectForm;
