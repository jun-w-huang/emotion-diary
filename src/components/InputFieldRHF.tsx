import React from "react";

const InputFieldRHF = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => (
  <input
    placeholder={props.placeholder}
    {...props}
    ref={ref}
    className="w-full rounded-md bg-slate-300 p-3"
  />
))
InputFieldRHF.displayName = "TextField";
export default InputFieldRHF;
