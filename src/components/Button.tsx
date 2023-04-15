import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ ...props }, ref) => (
        <button
            {...props}
            ref={ref}
        >
          {/* {props.label} */}
          </button>
    ),
);

Button.displayName = "Button";