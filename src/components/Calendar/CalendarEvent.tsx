import { EmotionEvent } from "@prisma/client";

interface CalendarEventProps {
  event: EmotionEvent;
  onEventClick: (event: EmotionEvent) => void;
}

const CalendarEvent = (props: CalendarEventProps) => {
  return (
    <div 
    onClick={() => props.onEventClick(props.event)} 
    key={props.event.title} className="p-1 border border-black rounded-md text-black">
      <div className="text-sm font-medium">{props.event.title}</div>
      <div className="text-sm">{props.event.emotion}</div>
    </div>
  );
};

export default CalendarEvent;
