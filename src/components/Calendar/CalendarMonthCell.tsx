import React from "react";
import {
  format,
} from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarEvent from "./CalendarEvent";

interface CellProps {
  day: Date;
  currentDate: Date;
  monthEvents: EmotionEvent[];
}

const CalendarMonthCell = (props: CellProps) => {
  const formatDay = "d";
  const formattedDate = format(props.day, formatDay);

  const isSameMonth = (day: Date, monthStart: Date) => {
    return day.getMonth() === monthStart.getMonth();
  };

  const isSameDay = (day: Date, currentDate: Date) => {
    return (
      isSameMonth(day, currentDate) && day.getDate() === currentDate.getDate()
    );
  };

  const dayEvents = props.monthEvents.filter(
    (event) =>
      format(new Date(event.start), "MM/dd/yyyy") ===
      format(props.day, "MM/dd/yyyy")
  );

  return (
    <div
      key={props.day.toString()}
      className={`${
        !isSameMonth(props.day, props.currentDate) ? "text-gray-400" : ""
      } ${
        isSameDay(props.day, props.currentDate) ? "bg-gray-400 text-white" : ""
      } h-48 w-32 flex-1 border`}
    >
      <div className={`cursor-pointer rounded-full p-1 `}>
        <span className="number">{formattedDate}</span>
        <div className="mt-1 rounded-md bg-blue-200">
          {dayEvents.map((event) => (
            <CalendarEvent key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonthCell;
