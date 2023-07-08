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
        // this date will not be used, but our state type does not allow undefined values.
        date: new Date(),
        currentEvent: undefined,
      };
    default:
      return emotionRHFState;
  }
}
