import { createContext, useContext } from "react";
import {
  DetailedDayModalContextType,
  DetailedDayModalStateType,
} from "~/types/DetailedDayModal";

export const initialDetailedDayModalState: DetailedDayModalStateType = {
  isShowingModal: false,
  date: new Date(),
  dateEvents: [],
};

export const DetailedDayModalContext = createContext<
  DetailedDayModalContextType | undefined
>(undefined);

// https://reacttraining.com/blog/react-context-with-typescript
export function useDetailedDayModalContext() {
  const context = useContext(DetailedDayModalContext);
  if (context === undefined)
    throw Error(
      "DetailedDayModalContext must be used inside of a component that is a child of the provider, otherwise it will not function correctly."
    );

  return context;
}
