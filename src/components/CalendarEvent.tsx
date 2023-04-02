import { EmotionEvent } from "@prisma/client";

interface CalendarEventProps {
  event: EmotionEvent;
}

const CalendarEvent = (props: CalendarEventProps) => {
  return (
    <div key={props.event.title} className="p-1">
      <div className="text-sm font-medium">{props.event.title}</div>
      <div className="text-sm">{props.event.emotion}</div>
    </div>
  );
};

export default CalendarEvent;
