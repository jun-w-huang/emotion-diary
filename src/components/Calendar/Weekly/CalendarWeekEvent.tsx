import { EmotionEvent } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import { useEmotionRHFModalContext } from "~/pages/context/EmotionRHFModalContext";

interface CalendarWeekEventProps {
  event: EmotionEvent;
  overlappingEventsBefore: EmotionEvent[];
}

const WeekEvent = styled.div<{
  height: string;
  positionYOffset: string;
  positionLeftOffset: string;
}>`
  position: absolute;
  top: ${(props) => props.positionYOffset};
  left: ${(props) => props.positionLeftOffset};
  height: ${(props) => props.height};

  // temporarily give white background, will change to different color depending on emotion in future.
  background-color: #ffffff;
  min-height: fit-content;
  width: calc(100% - ${(props) => props.positionLeftOffset});
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
  // calculate start time in minutes since midnight
  const start = event.start.getUTCHours() * 60 + event.start.getUTCMinutes();
  const end = event.end
    ? event.end.getUTCHours() * 60 + event.end.getUTCMinutes()
    : start + 60; // calculate end time in minutes since midnight
  // minimum height is currently 70, this allows for 3 lines of text.
  // end - start finds time in minutes, divide by 60 to get time in hours,
  // 64 is the height of each hour in the sidebar)
  const result = Math.max(70, Math.round(((end - start) / 60) * 64)) + 32;
  return `${result}px`;
}

function positionYOffset(event: EmotionEvent): string {
  // calculate start time in minutes since midnight
  const start = event.start.getUTCHours() * 60 + event.start.getUTCMinutes();
  // add 32 as a constant because the hitbox of component is in the center, so we push it down
  const result = Math.round((start / 60) * 64) + 32;
  return `${result}px`;
}

function positionLeftOffset(overlappingEvents: EmotionEvent[]): string {
  let result = 0;
  result = overlappingEvents.length * 30;
  return `${result}px`;
}

const CalendarWeekEvent = (props: CalendarWeekEventProps) => {
  const { dispatch } = useEmotionRHFModalContext();
  const onEventClick = (event: EmotionEvent) => {
    dispatch({ type: "open selected", currentEvent: event });
  };

  return (
    <WeekEvent
      height={height(props.event)}
      positionYOffset={positionYOffset(props.event)}
      positionLeftOffset={positionLeftOffset(props.overlappingEventsBefore)}
      onClick={() => onEventClick(props.event)}
      key={props.event.title}
    >
      <div className="text-sm font-medium">{props.event.title}</div>
      <div className="text-sm">{props.event.emotion}</div>
    </WeekEvent>
  );
};

export default React.memo(CalendarWeekEvent);
