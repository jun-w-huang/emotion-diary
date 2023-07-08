import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface EmotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const EmotionButton = forwardRef<HTMLButtonElement, EmotionButtonProps>(
  ({ label, ...props }, ref) => (
    <button
      className={`flex h-10 w-24 items-center justify-center rounded-2xl bg-emotionDarkBlue text-white`}
      {...props}
      ref={ref}
    >
      {label}
    </button>
  )
);

EmotionButton.displayName = "EmotionButton";
