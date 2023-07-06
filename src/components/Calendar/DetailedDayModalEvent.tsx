import { EmotionEvent } from "@prisma/client";
import CalendarMonthEvent from "./Monthly/CalendarMonthEvent";
import { format } from "date-fns";

interface DetailedDayModalEventProps {
  event: EmotionEvent;
}

const DetailedDayModalEvent = (
  props: DetailedDayModalEventProps
): JSX.Element => {
  return (
    <div>
      <p className="text-emotionGray">
        {format(props.event.start, "p")} - {format(props.event.end, "p")}
      </p>
      <CalendarMonthEvent key={props.event.id} event={props.event} />
    </div>
  );
};

export default DetailedDayModalEvent;
