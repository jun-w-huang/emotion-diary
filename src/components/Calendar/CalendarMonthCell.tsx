import React from "react";
import { format, isSameDay, isSameMonth } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import { MemoizedCalendarEvent } from "./CalendarEvent";

interface CellProps {
  day: Date;
  currentDate: Date;
  monthEvents: EmotionEvent[];
  onEventClick: (event: EmotionEvent) => void;
  onDateClick: React.Dispatch<React.SetStateAction<Date>>
  isSelected: boolean;
}

const CalendarMonthCell = (props: CellProps) => {
  const formatDay = "d";
  const formattedDate = format(props.day, formatDay);

  const dayEvents = props.monthEvents.filter(
    (event) =>
      format(new Date(event.start), "MM/dd/yyyy") ===
      format(props.day, "MM/dd/yyyy")
  );
  
  if (!isSameMonth(props.day, props.currentDate)) {
    return <div key={props.day.toString()} className="h-36 w-32"></div>;
  } else {
    return (
      <div
        key={props.day.toString()}
        className={`overflow-y-scroll ${
          isSameDay(props.day, props.currentDate)
            ? "bg-gray-400 text-white"
            : ""
        } h-36 w-32 flex-1 border`}
      >
        <div className={`h-full  overflow-y-scroll p-1`}>
          <div className="flex flex-col items-center justify-center">
            <div onClick={() => props.onDateClick(props.day)} className={`flex justify-center items-center cursor-pointer h-7 w-7 m-1 rounded-full ${props.isSelected ? 'bg-blue-500 text-white' : 'text-black'}`}>{formattedDate}</div>
            {dayEvents.map((event) => (
              <MemoizedCalendarEvent
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
    prevProps.monthEvents === nextProps.monthEvents &&
    prevProps.isSelected === nextProps.isSelected
  );
}

export const MemoizedCalendarMonthCell = React.memo(CalendarMonthCell, arePropsEqual);
