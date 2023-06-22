export interface DetailedDayModalStateType {
  isShowingModal: boolean;
  date: Date;
  dateEvents: EmotionEvent[];
}

export interface DetailedDayModalContextType {
  state: DetailedDayModalStateType;
  dispatch: Dispatch<ActionType>;
}
