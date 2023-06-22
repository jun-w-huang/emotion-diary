import { Dialog } from "@headlessui/react";
import CalendarMonthEvent from "./Monthly/CalendarMonthEvent";
import { EmotionButton } from "../EmotionButton";
import { EmotionEvent } from "@prisma/client";
import { useEmotionRHFModalContext } from "~/context/EmotionRHFModalContext";
import { useDetailedDayModalContext } from "~/context/DetailedDayModalContext";

interface DetailedDayModalProps {
  dateEvents: EmotionEvent[];
  closeModal: () => void;
}

const DetailedDayModal = (props: DetailedDayModalProps) => {
  const { state } = useDetailedDayModalContext();
  const { dispatch } = useEmotionRHFModalContext();
  const onAddEventClick = (date: Date) =>
    dispatch({
      type: "open new",
      date: date,
    });

  return (
    <Dialog
      open={state.isShowingModal}
      onClose={props.closeModal}
      className="relative z-50"
    >
      <div className="fixed inset-0 " aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="absolute bottom-0 right-0 mx-auto h-3/6 w-96 rounded-lg border-8 bg-white p-6 shadow-none">
          <Dialog.Title className={"text-xl font-bold"}>
            {state.date.toString()}
          </Dialog.Title>
          <EmotionButton onClick={() => onAddEventClick(state.date)}>
            Add event
          </EmotionButton>
          {props.dateEvents.map((e) => (
            <CalendarMonthEvent key={e.id} event={e} />
          ))}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DetailedDayModal;
