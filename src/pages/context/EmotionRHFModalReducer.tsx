import type {
  EmotionRHFActionType,
  EmotionRHFModalStateType,
} from "~/types/EmotionRHFModal";

export function emotionRHFReducer(
  emotionRHFState: EmotionRHFModalStateType,
  action: EmotionRHFActionType
): EmotionRHFModalStateType {
  switch (action.type) {
    case "open selected":
      return {
        isShowingModal: true,
        date: action.currentEvent.start,
        currentEvent: action.currentEvent,
      };
    case "open new":
      return {
        isShowingModal: true,
        date: action.date,
        currentEvent: undefined,
      };
    case "close":
      return {
        isShowingModal: false,
        date: undefined,
        currentEvent: undefined,
      };
    default:
      return emotionRHFState;
  }
}
