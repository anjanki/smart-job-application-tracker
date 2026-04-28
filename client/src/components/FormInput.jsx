const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-md border border-slate-300 px-4 py-2 outline-none focus:border-emerald-500"
      />
    </div>
  );
};

export default FormInput;
