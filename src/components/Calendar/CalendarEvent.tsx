import { EmotionEvent } from "@prisma/client";
import styled, { css } from "styled-components";

interface CalendarEventProps {
  event: EmotionEvent;
  onEventClick: (event: EmotionEvent) => void;
  calendarType: "week" | "month";
}

const Event = styled.div<{
  height?: string;
}>`
  height: ${(props) => (props.height ? props.height : "#000000")};
`;

const CalendarEvent = (props: CalendarEventProps) => {
  if (props.calendarType === "week") {
    const duration = () => {
      const start =
        props.event.start.getUTCHours() * 60 +
        props.event.start.getUTCMinutes(); // calculate start time in minutes since midnight
      const end = props.event.end
        ? props.event.end.getUTCHours() * 60 + props.event.end.getUTCMinutes()
        : start + 60; // calculate end time in minutes since midnight
      const result = Math.max(60, Math.round((end - start) / 3));
      return `${result}px`;
    };

    return (
      <Event
        height={duration()}
        onClick={() => props.onEventClick(props.event)}
        key={props.event.title}
        className={`cursor-pointer rounded-md 
      border border-black bg-slate-400 p-1 text-black transition hover:bg-black hover:text-white`}
      >
        <div className="text-sm font-medium">{props.event.title}</div>
        <div className="text-sm">{props.event.emotion}</div>
      </Event>
    );
  } else {
    return (
      <div
        onClick={() => props.onEventClick(props.event)}
        key={props.event.title}
        className="cursor-pointer rounded-md border border-black bg-slate-400 p-1 text-black transition hover:bg-black hover:text-white"
      >
        <div className="text-sm font-medium">{props.event.title}</div>
        <div className="text-sm">{props.event.emotion}</div>
      </div>
    );
  }
};

export default CalendarEvent;
