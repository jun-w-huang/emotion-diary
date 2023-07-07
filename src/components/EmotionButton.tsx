import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export interface EmotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

export const EmotionButton = forwardRef<HTMLButtonElement, EmotionButtonProps>(
  ({ ...props }, ref) => (
    <button
      className={`flex h-10 w-24 items-center justify-center rounded-2xl bg-emotionDarkBlue text-white ${props.className}`}
      {...props}
      ref={ref}
    >
      <label>{props.label}</label>
    </button>
  )
);

EmotionButton.displayName = "EmotionButton";
