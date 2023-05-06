import type { FieldError } from "react-hook-form";

interface EntryLabelProps {
  error?: FieldError;
  label: string;
  required?: boolean;
}

export const EntryLabel = (props: EntryLabelProps) => {
  return props.required ? (
    <div className={`${props.error ? "text-red-500" : ""} `}>
      {props.label}
      <span className="text-red-500 pl-1">*</span>
    </div>
  ) : (
    <div className={`${props.error ? "text-red-500" : ""} `}>{props.label}</div>
  );
};
