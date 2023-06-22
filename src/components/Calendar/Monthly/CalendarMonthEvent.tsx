import { EmotionEvent } from "@prisma/client";
import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import JoySVG from "../../../../public/emotionSVGs/Joy.svg";
import { useEmotionRHFModalContext } from "~/context/EmotionRHFModalContext";

interface CalendarMonthEventProps {
  event: EmotionEvent;
}

const MonthEvent = styled.div`
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

  const EmotionSVG = lazy<React.ComponentType<any>>(
    () =>
      import(`../../../../public/emotionSVGs/${props.event.emotion}.svg`).catch(
        () => import(`../../../../public/emotionSVGs/Joy.svg`)
      ) as Promise<{ default: React.ComponentType<any> }>
  );

  const DefaultSVG = () => {
    return (
      <div className="h-full w-7 scale-[0.4]">
        {/* should probably change this to a different SVG in the future */}
        <JoySVG className="box-border" />
      </div>
    );
  };

  return (
    <MonthEvent
      onClick={() => onEventClick(props.event)}
      key={props.event.title}
    >
      <Suspense fallback={<DefaultSVG />}>
        <div className="w-7 scale-[0.4]">
          <EmotionSVG className="box-border" />
        </div>
      </Suspense>

      <p className="w-full truncate text-sm font-medium">{props.event.title}</p>
    </MonthEvent>
  );
};

export default React.memo(CalendarMonthEvent);
