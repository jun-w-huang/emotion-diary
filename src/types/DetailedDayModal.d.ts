import type { EmotionEvent } from "@prisma/client";
import type { Dispatch } from "react";

export interface DetailedDayModalStateType {
  isShowingModal: boolean;
  date: Date;
  dateEvents: EmotionEvent[];
}

export type DetailedDayActionType =
  | { type: "open selected"; date: Date, dateEvents: EmotionEvent[] }
  | { type: "close" };

export interface DetailedDayModalContextType {
  state: DetailedDayModalStateType;
  // type ActionType = /*unresolved*/ any
  dispatch: Dispatch<DetailedDayActionType>;
}
