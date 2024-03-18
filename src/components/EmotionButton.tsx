import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface EmotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string; // Add className prop
}


export const EmotionButton = forwardRef<HTMLButtonElement, EmotionButtonProps>(
  ({ label, className, ...props }, ref) => (
    <button
      className={`flex h-10 w-24 items-center justify-center rounded-2xl bg-emotionDarkBlue text-white ${className}`}
      {...props}
      ref={ref}
    >
      {label}
    </button>
  )
);


EmotionButton.displayName = "EmotionButton";
