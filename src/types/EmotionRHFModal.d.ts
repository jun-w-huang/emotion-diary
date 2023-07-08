import type { EmotionEvent } from "@prisma/client";
import type { Dispatch } from "react";

export interface EmotionRHFModalStateType {
  isShowingModal: boolean;
  date: Date;
  currentEvent: EmotionEvent | undefined;
}

export type EmotionRHFActionType =
  | { type: "open selected"; currentEvent: EmotionEvent }
  | {
      type: "open new";
      date: Date;
    }
  | { type: "close" };

export interface EmotionRHFModalContextType {
  state: EmotionRHFModalStateType;
  dispatch: Dispatch<EmotionRHFActionType>;
}
