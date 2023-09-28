interface SelectProps {
  name: string;
  list: string[];
  defaultValue?: string;
}

const SelectForm: React.FC<SelectProps> = ({
  name,
  list,
  defaultValue = '',
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name}></label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="h-12 w-full outline-none text-inherit font-roboto rounded-2xl py-2 px-4 bg-inherit border border-light-gray"
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
