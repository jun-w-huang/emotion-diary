import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface EmotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isActive?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const EmotionButton = forwardRef<HTMLButtonElement, EmotionButtonProps>(
  ({ ...props }, ref) =>
    props.isActive ? (
      <button
        className="flex h-12 w-32 pl-2 items-center gap-2 rounded-lg bg-white text-emotionDarkBlue"
        {...props}
        ref={ref}
      >
        {props.icon && <props.icon className={"text-emotionDarkBlue"} />}
        <h2>{props.children}</h2>
      </button>
    ) : (
      <button
        className="flex h-12 w-32 pl-2 items-center gap-2 rounded-lg text-emotionGray"
        {...props}
        ref={ref}
      >
        {props.icon && (
            <props.icon className={"text-emotionGray"}/>
        )}
        <h2>{props.children}</h2>
      </button>
    )
);

EmotionButton.displayName = "EmotionButton";
