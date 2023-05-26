import { EmotionEvent } from "@prisma/client";
import React from "react";
import styled from "styled-components";

interface CalendarMonthEventProps {
  event: EmotionEvent;
  onEventClick: (event: EmotionEvent) => void;
}

const MonthEvent = styled.div`
  width: 100%;
  cursor: pointer;
  color: black;
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
      <div className="w-full flex items-center gap-1 ">
        <div className="h-1 w-1 p-1 rounded-full bg-black"></div>
        <p className="truncate text-sm font-medium">{props.event.title}</p>
      </div>
    </MonthEvent>
  );
};

export default React.memo(CalendarMonthEvent);
