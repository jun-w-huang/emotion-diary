import { Dialog } from "@headlessui/react";
import { DetailedDayModalDetails } from "./CalendarMonthlyView";
import CalendarMonthEvent from "./CalendarMonthEvent";
import { EmotionEvent } from "@prisma/client";
import { EmotionButton } from "../EmotionButton";

interface DetailedDayModalProps {
  details: DetailedDayModalDetails;
  date: Date;
  onEventClick: (event: EmotionEvent) => void;
  onAddEventClick: (date: Date) => void
  closeModal: () => void;
}

const DetailedDayModal = (props: DetailedDayModalProps) => {
  return (
    <Dialog
      open={props.details.isShowingModal}
      onClose={props.closeModal}
      className="relative z-50"
    >
      <div className="fixed inset-0 " aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto absolute h-3/6 w-96 bottom-0 right-0 bg-white rounded-lg border-8 p-6 shadow-none">
          <Dialog.Title className={"text-xl font-bold"}>{props.date.toString()}</Dialog.Title>
          <EmotionButton
          onClick={() => props.onAddEventClick(props.date)}
        >
          Add event
        </EmotionButton>
          {props.details.dateEvents.map((e) => 
            <CalendarMonthEvent key={e.id} event={e} onEventClick={props.onEventClick}/>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DetailedDayModal;
