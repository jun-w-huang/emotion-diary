import { EmotionEvent } from "@prisma/client";
import CalendarMonthEvent from "./Monthly/CalendarMonthEvent";
import { format } from "date-fns";
import { utcToLocal } from "~/utils/utcToLocal";

interface DetailedDayModalEventProps {
  event: EmotionEvent;
}

const DetailedDayModalEvent = (
  props: DetailedDayModalEventProps
): JSX.Element => {

  const endTime = props.event.end ? format(utcToLocal(props.event.end), "p") : ""
  return (
    <div>
      <p className="text-emotionGray">
        {format(utcToLocal(props.event.start), "p")} - {endTime}
      </p>
      <CalendarMonthEvent key={props.event.id} event={props.event} />
    </div>
  );
};

export default DetailedDayModalEvent;
