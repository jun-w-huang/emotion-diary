import { createContext, useContext } from "react";
import {
  EmotionRHFModalContextType,
  EmotionRHFModalStateType,
} from "~/types/EmotionRHFModal";

export const initialEmotionRHFState: EmotionRHFModalStateType = {
  isShowingModal: false,
  date: new Date(),
  currentEvent: undefined,
};

export const EmotionRHFModalContext = createContext<
  EmotionRHFModalContextType | undefined
>(undefined);

// https://reacttraining.com/blog/react-context-with-typescript
export function useEmotionRHFModalContext() {
  const context = useContext(EmotionRHFModalContext);
  if (context === undefined)
    throw Error(
      "CreateEmotionRHFModalContext must be used inside of a component that is a child of the provider, otherwise it will not function correctly."
    );

  return context;
}
