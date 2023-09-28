interface SelectProps {
  name: string;
  list: string[];
  defaultValue?: string;
  className?: string;
}

const SelectForm: React.FC<SelectProps> = ({
  name,
  list,
  defaultValue = '',
  className,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name}></label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`w-full outline-none text-inherit font-roboto rounded-xl px-3 py-2 bg-inherit border border-zinc-900 bg-neutral-950 bg-opacity-50 font-light placeholder-neutral-500
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
