import React from "react";
import { format, isSaturday, isToday } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarWeekEvent from "./CalendarWeekEvent";
import { isBefore, isAfter, isSameMinute, addMinutes } from "date-fns";

interface CellProps {
  day: Date;
  currentDate: Date;
  monthEvents: EmotionEvent[];
  onEventClick: (event: EmotionEvent) => void;
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
  const dayEvents = props.monthEvents
    .filter(
      (event) =>
        format(new Date(event.start), "MM/dd/yyyy") ===
        format(props.day, "MM/dd/yyyy")
    )
    .sort((eventA, eventB) => {
      // Compare the start dates
      if (eventA.start.getTime() !== eventB.start.getTime()) {
        return eventA.start.getTime() - eventB.start.getTime();
      }

      // If the start dates are the same, compare the end dates
      // Ordered so that the event that ends first is ordered AFTER.
      const endDateA = eventA.end || eventA.start;
      const endDateB = eventB.end || eventB.start;
      return endDateB.getTime() - endDateA.getTime();
    });

  return (
    <div
      key={props.day.toString()}
      className={`flex-1 
      ${isToday!(props.day) ? "bg-gray-100 text-white" : "bg-white"}
      ${isSaturday!(props.day) ? "" : "border-r"}
        w-1/7`}
    >
      <div className={`relative h-full p-1 `}>
        {dayEvents.map((event, index) => {
          const eventsSubset = dayEvents.slice(0, index); // Subset of events before the current event
          return (
            <CalendarWeekEvent
              key={event.id}
              onEventClick={props.onEventClick}
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
