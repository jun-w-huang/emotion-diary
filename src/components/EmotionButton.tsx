import React, { ButtonHTMLAttributes, forwardRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

export interface EmotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
  disabled?: boolean;
}

export const EmotionButton = forwardRef<HTMLButtonElement, EmotionButtonProps>(
  ({ label, className, disabled, ...props }, ref) => {
    console.log(disabled);

    if (!disabled) {
      return (
        <button
          className={`flex h-10 w-24 items-center justify-center rounded-2xl bg-emotionDarkBlue text-white ${
            className || ""
          }`}
          {...props}
          ref={ref}
          disabled
        >
          <LoadingSpinner size={6} />
        </button>
      );
    }
    return (
      <button
        className={`flex h-10 w-24 items-center justify-center rounded-2xl bg-emotionDarkBlue text-white ${
          className || ""
        }`}
        {...props}
        ref={ref}
      >
        {label}
      </button>
    );
  }
);

EmotionButton.displayName = "EmotionButton";
