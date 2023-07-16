import { EmotionEvent } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import { useEmotionRHFModalContext } from "~/context/EmotionRHFModalContext";
import EmotionSVG from "../../EmotionSVG";

interface CalendarMonthEventProps {
  event: EmotionEvent;
}

export const MonthEvent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
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
  const { dispatch } = useEmotionRHFModalContext();
  const onEventClick = (event: EmotionEvent) => {
    dispatch({ type: "open selected", currentEvent: event });
  };

  return (
    <MonthEvent
      onClick={() => onEventClick(props.event)}
      key={props.event.title}
    >
      <div className="relative w-6">
        <EmotionSVG
          emotion={props.event.emotion}
          className="origin-left scale-40"
        />
      </div>

      <p className="w-full truncate">{props.event.title}</p>
    </MonthEvent>
  );
};

export default React.memo(CalendarMonthEvent);
