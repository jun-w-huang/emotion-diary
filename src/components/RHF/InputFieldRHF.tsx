import React from "react";

const InputFieldRHF = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full rounded-md bg-emotionLightGray p-3 text-black"
  />
))
InputFieldRHF.displayName = "TextField";
export default InputFieldRHF;
