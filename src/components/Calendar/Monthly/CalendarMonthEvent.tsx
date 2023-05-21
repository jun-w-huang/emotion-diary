import { EmotionEvent } from "@prisma/client";
import React from "react";
import styled from "styled-components";

interface CalendarMonthEventProps {
  event: EmotionEvent;
  onEventClick: (event: EmotionEvent) => void;
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

const CalendarMonthEvent = (props: CalendarMonthEventProps) => {
  return (
    <MonthEvent
      onClick={() => props.onEventClick(props.event)}
      key={props.event.title}
    >
      <div className="text-sm font-medium">{props.event.title}</div>
      <div className="text-sm">{props.event.emotion}</div>
    </MonthEvent>
  );
};

export default React.memo(CalendarMonthEvent);
