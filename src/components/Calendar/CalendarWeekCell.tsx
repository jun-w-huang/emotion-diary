import React from "react";
import { format } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarEvent from "./CalendarEvent";

interface CellProps {
  day: Date;
  currentDate: Date;
  monthEvents: EmotionEvent[];
  onEventClick: (event: EmotionEvent) => void;
}

const CalendarWeekCell = (props: CellProps) => {
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
      className={`flex-1 ${
        !isSameMonth(props.day, props.currentDate) ? "text-gray-400" : ""
      } ${
        isSameDay(props.day, props.currentDate) ? "bg-gray-400 text-white" : ""
      } w-32 border`}
    >
      <div className={`h-full rounded-full p-1 `}>
        <span className="number">{formattedDate}</span>
        <div className="flex flex-col">
          {dayEvents.map((event) => {
            
            return (
              <CalendarEvent
                onEventClick={props.onEventClick}
                key={event.id}
                event={event}
                calendarType="week"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarWeekCell;
