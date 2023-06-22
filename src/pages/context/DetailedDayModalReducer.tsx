import { EmotionEvent } from "@prisma/client";
import { DetailedDayModalStateType } from "~/types/DetailedDayModal";

type DetailedDayActionType =
  | { type: "open selected"; date: Date, dateEvents: EmotionEvent[] }
  | { type: "close" };

export function detailedDayModalReducer(
  DetailedDayState: DetailedDayModalStateType,
  action: DetailedDayActionType
): DetailedDayModalStateType {
  switch (action.type) {
    case "open selected":
      return {
        isShowingModal: true,
        date: action.date,
        dateEvents: action.dateEvents,
      };
    case "close":
      return {
        isShowingModal: false,
        date: new Date(),
        dateEvents: [],
      };
    default:
      return DetailedDayState;
  }
}
