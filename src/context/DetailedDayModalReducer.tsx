import type { DetailedDayActionType, DetailedDayModalStateType } from "~/types/DetailedDayModal";

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
