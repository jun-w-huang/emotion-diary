import { useEmotionRHFModalContext } from "~/context/EmotionRHFModalContext";
import { useDetailedDayModalContext } from "~/context/DetailedDayModalContext";
import { format } from "date-fns";
import PlusSVG from "../../../public/plus.svg";
import DetailedDayModalEvent from "./DetailedDayModalEvent";
import { EmotionEvent } from "@prisma/client";

interface DetailedDayModalProps {
  events: EmotionEvent[];
}

const DetailedDayModal = (props: DetailedDayModalProps) => {
  const { state } = useDetailedDayModalContext();
  const { dispatch } = useEmotionRHFModalContext();

  const dayEvents = props.events.filter(
    (event) =>
      format(event.start, "MM/dd/yyyy") === format(state.date, "MM/dd/yyyy")
  );

  const onAddEventClick = (date: Date) =>
    dispatch({
      type: "open new",
      date: new Date(date.setUTCHours(9)),
    });

  return (
    <div className="flex max-h-96 min-h-[250px] w-full grow flex-col items-center justify-between overflow-y-scroll rounded-lg bg-white p-3 shadow-none">
      <p>{format(state.date, "eeee, MMMM d")}</p>
      <div className="flex w-full flex-col">
        {dayEvents.length === 0 ? (
          <p>No events on this day, click the button below to add a new one!</p>
        ) : (
          <div>
            {dayEvents.map((event) => (
              <DetailedDayModalEvent event={event} key={event.id} />
            ))}
          </div>
        )}
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
