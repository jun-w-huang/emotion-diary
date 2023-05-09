import { EmotionEvent } from "@prisma/client";
import React from "react";
import styled from "styled-components";

interface CalendarEventProps {
  event: EmotionEvent;
  onEventClick: (event: EmotionEvent) => void;
  calendarType: "week" | "month";
}

const Event = styled.div<{
  height?: string;
}>`
  height: ${(props) => (props.height ? props.height : "#000000")};
  width: 100%;
  cursor: pointer;
  color: black;
  border-radius: 0.375rem;
  border: 1px solid black;
  padding: 0.25rem;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 0.2s;

  :hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

const CalendarEvent = (props: CalendarEventProps) => {
  let height = undefined;
  if (props.calendarType === "week") {
    const start =
      props.event.start.getUTCHours() * 60 + props.event.start.getUTCMinutes(); // calculate start time in minutes since midnight
    const end = props.event.end
      ? props.event.end.getUTCHours() * 60 + props.event.end.getUTCMinutes()
      : start + 60; // calculate end time in minutes since midnight
    const result = Math.max(60, Math.round((end - start) / 3));
    height = `${result}px`;
  }

  return (
    <Event
      height={height}
      onClick={() => props.onEventClick(props.event)}
      key={props.event.title}
    >
      <div className="text-sm font-medium">{props.event.title}</div>
      <div className="text-sm">{props.event.emotion}</div>
    </Event>
  );
};

export const MemoizedCalendarEvent = React.memo(CalendarEvent);
