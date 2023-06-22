export interface EmotionRHFModalStateType {
  isShowingModal: boolean;
  date: Date | undefined;
  currentEvent: EmotionEvent | undefined;
}

export interface EmotionRHFModalContextType {
  state: EmotionRHFModalStateType;
  dispatch: Dispatch<ActionType>;
}
