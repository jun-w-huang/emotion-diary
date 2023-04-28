import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface EmotionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export const EmotionButton = forwardRef<HTMLButtonElement, EmotionButtonProps>(
    ({ ...props }, ref) => (
        <button
        className="rounded-lg border bg-slate-500 text-white h-12 w-48 items-center"
            {...props}
            ref={ref}
        >
          </button>
    ),
);

EmotionButton.displayName = "EmotionButton";