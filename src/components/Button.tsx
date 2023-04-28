import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ ...props }, ref) => (
        <button
        className="rounded-lg border bg-slate-500 px-4 text-white"
            {...props}
            ref={ref}
        >
          {/* {props.label} */}
          </button>
    ),
);

Button.displayName = "Button";