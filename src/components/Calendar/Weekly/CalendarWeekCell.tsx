import React from "react";
import { format, isSaturday, isToday } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarWeekEvent from "./CalendarWeekEvent";
import { isBefore, isAfter, isSameMinute, addMinutes } from "date-fns";

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
  const overlappingEvents = eventsSubset.filter((e, index) => {
    if (index <= eventIndex) {
      return false;
    }

    const eventStart = event.start;
    const eventEnd = event.end || addMinutes(eventStart, 60);
    const eStart = e.start || e.end;
    const eEnd = e.end || addMinutes(eStart, 60);

    const isSameStart = isSameMinute(eventStart, eStart);
    const isSameEnd = isSameMinute(eventEnd, eEnd);

    if (isSameStart && isSameEnd) {
      // If events start and end at the same time, consider the shorter event as overlapping
      return isBefore(eventEnd, eEnd);
    }

    return (
      (isBefore(eventStart, eEnd) && isAfter(eventEnd, eStart)) ||
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
