import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export interface EmotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isActive?: boolean;
  icon?: ReactNode;
}

export const EmotionButton = forwardRef<HTMLButtonElement, EmotionButtonProps>(
  ({ isActive, ...props }, ref) => (
    <button
      className={`flex h-12 w-32 flex-row items-center rounded-lg pl-2 gap-2 ${
        isActive ? "bg-white text-emotionDarkBlue" : "text-emotionGray"
      }`}
      {...props}
      ref={ref}
    >
      {props.icon ? props.icon : undefined}
      <h2>{props.children}</h2>
    </button>
  )
);

EmotionButton.displayName = "EmotionButton";
