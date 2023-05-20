import React from "react";
import { format, isSameMonth, isToday } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarEvent from "./CalendarMonthEvent";

interface CellProps {
  day: Date;
  currentDate: Date;
  dayEvents: EmotionEvent[];
  onEventClick: (event: EmotionEvent) => void;
  onDateClick: (date: Date, dateEvents: EmotionEvent[]) => void
  isSelected: boolean;
}

const CalendarMonthCell = (props: CellProps) => {
  const formatDay = "d";
  const formattedDate = format(props.day, formatDay);

  if (!isSameMonth(props.day, props.currentDate)) {
    return <div key={props.day.toString()} className="h-36 w-32"></div>;
  } else {
    return (
      <div
        key={props.day.toString()}
        className={`overflow-y-scroll ${
          isToday(props.day)
            ? "bg-gray-400 text-white"
            : ""
        } h-36 w-32 flex-1 border`}
      >
        <div className={`h-full  overflow-y-scroll p-1`}>
          <div className="flex flex-col items-center justify-center">
            <div onClick={() => props.onDateClick(props.day, props.dayEvents)} className={`flex justify-center items-center cursor-pointer h-7 w-7 m-1 rounded-full ${props.isSelected ? 'bg-blue-500 text-white' : 'text-black'}`}>{formattedDate}</div>
            {props.dayEvents.map((event) => (
              <CalendarEvent
                key={event.id}
                event={event}
                onEventClick={props.onEventClick}
                calendarType="month"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

  
  
function arePropsEqual(prevProps: CellProps, nextProps: CellProps) {
  return (
    prevProps.day.valueOf() === nextProps.day.valueOf() &&
    prevProps.currentDate.valueOf() === nextProps.currentDate.valueOf() &&
    prevProps.dayEvents == nextProps.dayEvents &&
    prevProps.isSelected === nextProps.isSelected
  );
}

export default React.memo(CalendarMonthCell, arePropsEqual);
