import React from "react";
import { isSaturday, isToday } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarWeekEvent from "./CalendarWeekEvent";
import { isBefore, isAfter } from "date-fns";

interface CellProps {
  day: Date;
  currentDate: Date;
  dayEvents: EmotionEvent[];
}

// this function takes in an event and returns a list of events that overlap in time
// and are events that begin before this event.
function calcOverlappingEventsBefore(
  event: EmotionEvent,
  eventsSubset: EmotionEvent[]
): EmotionEvent[] {
  const eventIndex = eventsSubset.findIndex((e) => e === event);
  const overlappingEvents = eventsSubset.filter((other, index) => {
    if (index <= eventIndex) {
      return false;
    }

    // handle if event end is null. We will just use start time + 1 hour.
    const eventEnd = event.end ?? new Date(event.start.getTime() + 3600000)
    const otherEnd = other.end ?? new Date(other.start.getTime() + 3600000)

    // currently MySQL db includes seconds, we dont' actually care about seconds.
    // possible solutions are:
    // 1) Fix on frontend by dropping seconds in the Form
    // 2) Fix on TRPC by dropping seconds in the router
    // 3) Find a way to drop seconds in Prisma, but unsure how to do this...
    event.start.setSeconds(0);
    eventEnd.setSeconds(0);
    other.start.setSeconds(0);
    otherEnd.setSeconds(0);

    const isSameStart = event.start === other.start;
    const isSameEnd = eventEnd === otherEnd;

    if (isSameStart && isSameEnd) {
      // If events start and end at the same time, consider the shorter event as overlapping
      return isBefore(eventEnd, otherEnd);
    }

    return (
      (isBefore(event.start, otherEnd) && isAfter(eventEnd, other.start)) ||
      (isSameStart && !isSameEnd)
    );
  });

  return overlappingEvents;
}

const CalendarWeekCell = (props: CellProps) => {
  return (
    <div
      key={props.day.toString()}
      className={`flex-1 
      ${isToday(props.day) ? "bg-gray-100 text-white" : "bg-white"}
      ${isSaturday(props.day) ? "" : "border-r"}
        w-1/7`}
    >
      <div className={`relative h-full p-1 `}>
        {props.dayEvents.map((event, index) => {
          const eventsSubset = props.dayEvents.slice(0, index); // Subset of events before the current event
          return (
            <CalendarWeekEvent
              key={event.id}
              event={event}
              overlappingEventsBefore={calcOverlappingEventsBefore(
                event,
                eventsSubset
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWeekCell;
