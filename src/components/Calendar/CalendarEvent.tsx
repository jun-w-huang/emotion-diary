import { EmotionEvent } from "@prisma/client";
import React from "react";
import styled from "styled-components";

interface CalendarEventProps {
  event: EmotionEvent;
  onEventClick: (event: EmotionEvent) => void;
  calendarType: "week" | "month";
}

const MonthEvent = styled.div`
  min-height: fit-content;
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

const WeekEvent = styled.div<{
  height: string;
  positionYOffset: string;
}>`
  position: relative;
  top: ${(props) => props.positionYOffset};
  height: ${(props) => props.height};

  min-height: fit-content;
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

function height(event: EmotionEvent): string {
  const start = event.start.getUTCHours() * 60 + event.start.getUTCMinutes(); // calculate start time in minutes since midnight
  const end = event.end
    ? event.end.getUTCHours() * 60 + event.end.getUTCMinutes()
    : start + 60; // calculate end time in minutes since midnight
  // minimum height is currently 70, this allows for 3 lines of text.
  // end - start finds time in minutes, divide by 60 to get time in hours,
  // 64 is the height of each hour in the sidebar
  const result = Math.max(70, Math.round(((end - start) / 60) * 64));
  return `${result}px`;
}

function positionYOffset(event: EmotionEvent): string {
  const start = event.start.getUTCHours() * 60 + event.start.getUTCMinutes(); // calculate start time in minutes since midnight

  const result = Math.round((start / 60) * 64);
  return `${result}px`;
}

const CalendarEvent = (props: CalendarEventProps) => {
  if (props.calendarType === "month") {
    return (
      <MonthEvent
        onClick={() => props.onEventClick(props.event)}
        key={props.event.title}
      >
        <div className="text-sm font-medium">{props.event.title}</div>
        <div className="text-sm">{props.event.emotion}</div>
      </MonthEvent>
    );
  } else {
    return (
      <WeekEvent
        height={height(props.event)}
        positionYOffset={positionYOffset(props.event)}
        onClick={() => props.onEventClick(props.event)}
        key={props.event.title}
      >
        <div className="text-sm font-medium">{props.event.title}</div>
        <div className="text-sm">{props.event.emotion}</div>
      </WeekEvent>
    );
  }
};

export default React.memo(CalendarEvent);
