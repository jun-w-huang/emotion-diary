import React, { useState } from "react";
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarEvent from "./CalendarEvent";

interface CellProps {
  day: Date;
  currentDate: Date;
  monthEvents: EmotionEvent[];
}

const Cell = (props: CellProps) => {
  const formatDay = "d";
  const formattedDate = format(props.day, formatDay);

  const isSameMonth = (day: Date, monthStart: Date) => {
    return day.getMonth() === monthStart.getMonth();
  };

  const isSameDay = (day: Date, currentDate: Date) => {
    return isSameMonth(day, currentDate) && day.getDate() === currentDate.getDate();
  };

  const dayEvents = props.monthEvents.filter((event) => format(new Date(event.start), "MM/dd/yyyy") === format(props.day, "MM/dd/yyyy"));

  return (
    <div key={props.day.toString()} className={`${!isSameMonth(props.day, props.currentDate) ? "text-gray-400" : ""} flex-1 border w-32 h-32`}>
      <div
        className={`p-1 cursor-pointer rounded-full ${
          isSameDay(props.day, props.currentDate) ? "bg-blue-400 text-white" : ""
        }`}
      >
        <span className="number">{formattedDate}</span>
        <div className="bg-blue-200 rounded-md mt-1">
          {dayEvents.map((event) => (
            <CalendarEvent event={event}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cell;
