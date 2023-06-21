import { EmotionEvent } from "@prisma/client";
import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import JoySVG from "../../../../public/emotionSVGs/Joy.svg";

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
  console.log(props.event.emotion);
  const EmotionSVG = lazy(() =>
    import(`../../../../public/emotionSVGs/${props.event.emotion}.svg`).catch(
      () => import(`../../../../public/emotionSVGs/Joy.svg`)
    )
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
      onClick={() => props.onEventClick(props.event)}
      key={props.event.title}
    >
      <div className="flex w-full items-center">
        <Suspense fallback={<DefaultSVG />}>
          <div className="h-full w-7 scale-[0.4]">
            <EmotionSVG className="box-border" />
          </div>
        </Suspense>

        <p className="relative w-full truncate text-sm font-medium">
          {props.event.title}
        </p>
      </div>
    </MonthEvent>
  );
};

export default React.memo(CalendarMonthEvent);
