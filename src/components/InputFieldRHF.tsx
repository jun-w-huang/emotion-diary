const InputFieldRHF = (props: React.ComponentPropsWithRef<"input">) => {
  return (
    <input
      placeholder={props.placeholder}
      onChange={props.onChange}
      className="w-full rounded-md bg-slate-300 p-3"
    />
  );
};
export default InputFieldRHF;
