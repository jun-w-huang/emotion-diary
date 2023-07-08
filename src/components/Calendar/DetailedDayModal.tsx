import { useEmotionRHFModalContext } from "~/context/EmotionRHFModalContext";
import { useDetailedDayModalContext } from "~/context/DetailedDayModalContext";
import { format } from "date-fns";
import PlusSVG from "../../../public/plus.svg";
import DetailedDayModalEvent from "./DetailedDayModalEvent";
import { EmotionEvent } from "@prisma/client";

interface DetailedDayModalProps {
  events: EmotionEvent[]
}



const DetailedDayModal = (props: DetailedDayModalProps) => {
  const { state } = useDetailedDayModalContext();
  const { dispatch } = useEmotionRHFModalContext();

  const dayEvents = props.events.filter(
    (event) =>
      format(event.start, "MM/dd/yyyy") ===
      format(state.date, "MM/dd/yyyy")
  );

  const onAddEventClick = (date: Date) =>
    dispatch({
      type: "open new",
      date: date,
    });

  return (
    <div className="flex h-60 overflow-y-scroll w-full grow flex-col items-center justify-between rounded-lg bg-white p-3 shadow-none">
      <p>{format(state.date, "eeee, MMMM d")}</p>
      <div className="flex w-full flex-col">
        {dayEvents.map((event) => (
          <DetailedDayModalEvent event={event} key={event.id}/>
        ))}
      </div>

      <div className="self-end">
        <PlusSVG
          className="cursor-pointer"
          onClick={() => onAddEventClick(state.date)}
        />
      </div>
    </div>
  );
};

export default DetailedDayModal;
