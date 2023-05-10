import { startOfMonth, startOfWeek, addDays, isSameDay } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import { useMemo, useState } from "react";
import React from "react";
import CalendarMonthCell from "./CalendarMonthCell";

const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const weekDaysHeader = () => {
  return (
    <div className="flex rounded-3xl bg-slate-400 p-2 text-sm font-bold text-white">
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
  onEventClick: (event: EmotionEvent) => void;
}

const CalendarMonthlyView = (props: CalendarMonthlyViewProps) => {
  const monthStart = startOfMonth(props.currentDate);
  const startDate = startOfWeek(monthStart);
  const [selectedDay, setSelectedDay] = useState<Date>(props.currentDate);

  const days = () => {
    const rows = [];
    let days = [];
    let day = startDate;
    // Ensure that there are 6 rows in the calendar.
    // Some months might only have 5 if the days of the week align in a certain way.
    while (rows.length < 6) {
      for (let i = 0; i < 7; i++) {
        const isSelected = isSameDay(selectedDay, day);
        days.push(
          <CalendarMonthCell
            key={day.valueOf()}
            day={day}
            currentDate={props.currentDate}
            monthEvents={props.events}
            onEventClick={props.onEventClick}
            onDateClick={setSelectedDay}
            isSelected={isSelected}
          />
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.valueOf()} className="flex ">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  }

  return (
    <div>
      {weekDaysHeader()}
      <div
        key={`${props.currentDate.getMonth()}-${props.currentDate.getFullYear()}`}
        className=""
      >
        {days()}
      </div>
    </div>
  );
};

export default React.memo(CalendarMonthlyView);
