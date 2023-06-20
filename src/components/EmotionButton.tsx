import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface EmotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isActive?: boolean;
}

export const EmotionButton = forwardRef<HTMLButtonElement, EmotionButtonProps>(
  ({ isActive, ...props }, ref) => (
    <button
      className={`flex h-12 w-32 items-center rounded-lg pl-2 ${
        isActive ? "text-emotionDarkBlue bg-white" : "text-emotionGray"
      }`}
      {...props}
      ref={ref}
    >
      <h2 className="flex flex-row items-center gap-2">{props.children}</h2>
    </button>
  )
);

EmotionButton.displayName = "EmotionButton";
