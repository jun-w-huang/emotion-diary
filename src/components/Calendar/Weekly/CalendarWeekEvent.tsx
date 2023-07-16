import { Emotion, EmotionEvent } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import { useEmotionRHFModalContext } from "~/context/EmotionRHFModalContext";
import { utcToLocal } from "~/utils/utcToLocal";

interface CalendarWeekEventProps {
  event: EmotionEvent;
  overlappingEventsBefore: EmotionEvent[];
}

const EmotionToColorDict = {
  Joy: "#F3B962",
  Sadness: "#387FA3",
  Anger: "#E0786C",
  Fear: "#4EABB7",
  Surprise: "#FCD756",
  Disgust: "#5DB74E",
  Excitement: "#FF8DAF",
  Anticipation: "#FFD28D",
  Love: "#EB5757",
  Envy: "#2E9C67",
  Guilt: "#8DA6FF",
  Shame: "#AB5FE8",
  Embarrassment: "#FFB7B7",
  Hope: "#FFDA15",
  Despair: "#3468CD",
  Nostalgia: "#BDA6FF",
  Loneliness: "#308CAA",
  Gratitude: "#FFC737",
  Contentment: "#FFAFAF",
  Pride: "#BEF494",
  Jealousy: "#3F7636",
  Awe: "#A987E1",
  Curiosity: "#FCCC70",
  Confusion: "#FFE2AA",
  Boredom: "#B99D88",
  Relief: "#FFB69F",
  Regret: "#808080",
  Compassion: "#FFC195",
};

const WeekEvent = styled.div<{
  emotion: Emotion;
  height: string;
  positionYOffset: string;
  positionLeftOffset: string;
}>`
  position: absolute;
  top: ${(props) => props.positionYOffset};
  left: ${(props) => props.positionLeftOffset};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${(props) => EmotionToColorDict[props.emotion]};
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
  const start = event.start.getHours() * 60 + event.start.getMinutes();
  const end = event.end.getHours() * 60 + event.end.getMinutes(); // calculate end time in minutes since midnight
  // minimum height is currently 70, this allows for 3 lines of text.
  // end - start finds time in minutes, divide by 60 to get time in hours,
  // 64 is the height of each hour in the sidebar)
  const result = Math.max(64, Math.round(((end - start) / 60) * 64));
  return `${result}px`;
}

function positionYOffset(event: EmotionEvent): string {
  // calculate start time in minutes since midnight
  const start = utcToLocal(event.start).getHours() * 60 + utcToLocal(event.start).getMinutes();
  // add 32 as a constant because the hitbox of component is in the center, so we push it down
  // 32 is half the size of the timeline
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
      emotion={props.event.emotion}
      height={height(props.event)}
      positionYOffset={positionYOffset(props.event)}
      positionLeftOffset={positionLeftOffset(props.overlappingEventsBefore)}
      onClick={() => onEventClick(props.event)}
      key={props.event.title}
    >
      <p className="truncate">{props.event.title}</p>
    </WeekEvent>
  );
};

export default React.memo(CalendarWeekEvent);
