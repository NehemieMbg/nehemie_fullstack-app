interface SelectProps {
  name: string;
  list: string[];
  defaultValue?: string;
  label?: string;
  className?: string;
}

const SelectForm: React.FC<SelectProps> = ({
  name,
  list,
  defaultValue = '',
  className,
  label,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="text-light-gray">
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`w-full bg-dark-gray p-2 rounded-md outline-none font-roboto placeholder-light-gray mt-1
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
