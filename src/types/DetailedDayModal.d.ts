import type { EmotionEvent } from "@prisma/client";

export interface DetailedDayModalStateType {
  isShowingModal: boolean;
  date: Date;
  dateEvents: EmotionEvent[];
}

export interface DetailedDayModalContextType {
  state: DetailedDayModalStateType;
  dispatch: Dispatch<ActionType>;
}
