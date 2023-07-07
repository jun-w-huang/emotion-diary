import {
  startOfMonth,
  startOfWeek,
  addDays,
  isSameDay,
  format,
} from "date-fns";
import { EmotionEvent } from "@prisma/client";
import { useEffect, useState } from "react";
import React from "react";
import CalendarMonthCell from "./CalendarMonthCell";
import { useDetailedDayModalContext } from "~/context/DetailedDayModalContext";

const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const weekDaysHeader = () => {
  return (
    <div className="flex rounded-2.5xl bg-emotionLightBlue p-2 mb-10 text-sm font-bold text-white">
      {weekdays.map((day) => (
        <div key={day} className="flex flex-1 justify-center py-2">
          {day}
        </div>
      ))}
    </div>
  );
};

interface CalendarMonthlyViewProps {
  currentDate: Date;
  events: EmotionEvent[];
}

function filterEventsToDates(events: EmotionEvent[], startDate: Date): EmotionEvent[][] {
  const result = [];
  let day = startDate;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const dayEvents = events.filter(
        (event) =>
          format(event.start, "MM/dd/yyyy") ===
          format(day, "MM/dd/yyyy")
      );
      result.push(dayEvents);
      day = addDays(day, 1);
    }
  }
  return result;
}

const CalendarMonthlyView = (props: CalendarMonthlyViewProps) => {
  const monthStart = startOfMonth(props.currentDate);
  const startDate = startOfWeek(monthStart);

  const { state } = useDetailedDayModalContext();

  // This state hook will return an array of array of EmotionEvent. Each index represents a date in the month,
  // and each element is an array of that date's events. The length of the list will always be 42, because
  // our calendar view always has 6 weeks, each of 7 days.
  const [dateEvents, setDateEvents] = useState<EmotionEvent[][]>([]);

  // Recreate list of list of EmotionEvent if props.events or props.currentDate has changed
  // ie: Recreate if new events have been added/deleted/edited, or if the month being viewed has changed.
  useEffect(() => {
    setDateEvents(filterEventsToDates(props.events, startDate));
  }, [props.events, props.currentDate]);

  const days = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    // Ensure that there are 6 rows in the calendar, each with 7 days.
    // Some months might only have 5 if the days of the week align in a certain way.
    let index = 0;
    while (rows.length < 6) {
      for (let col = 0; col < 7; col++) {
        const isSelected = isSameDay(state.date, day);
        days.push(
          <CalendarMonthCell
            key={day.valueOf()}
            day={day}
            currentDate={props.currentDate}
            dayEvents={dateEvents[index] ?? []}
            isSelected={isSelected}
          />
        );
        index += 1;
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.valueOf()} className="flex justify-evenly h-full w-full items-stretch">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="flex flex-col w-full h-full">
      {weekDaysHeader()}
      <div
        key={`${props.currentDate.getMonth()}-${props.currentDate.getFullYear()}`}
        className="flex flex-col justify-evenly h-full w-full"
      >
        {days()}
      </div>
    </div>
  );
};

export default React.memo(CalendarMonthlyView);
