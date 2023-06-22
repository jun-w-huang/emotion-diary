import React from "react";
import { format, isSameMonth, isToday } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarMonthEvent from "./CalendarMonthEvent";

interface CellProps {
  day: Date;
  currentDate: Date;
  dayEvents: EmotionEvent[];
  onDateClick: (date: Date, dateEvents: EmotionEvent[]) => void;
  isSelected: boolean;
}

const CalendarMonthCell = (props: CellProps) => {
  const formatDay = "d";
  const formattedDate = format(props.day, formatDay);

  const renderCalendarEvents = () => {
    const result = [];

    const shownEvents = props.dayEvents.slice(0, 2);
    shownEvents.map((event) => {
      result.push(
        <CalendarMonthEvent
          key={event.id}
          event={event}
        />
      );
    });
    if (props.dayEvents.length > 2) {
      result.push(
        <div key={"rest"} className="flex w-full items-center gap-1 pl-[9px]">
          {/* This div is essentially just an SVG icon, but should probably be changed in future  */}
          <div className="h-1 w-1 rounded-full border border-black p-[7.6px]"></div>
          <p className="truncate text-sm font-medium">
            +{props.dayEvents.length - 2} more
          </p>
        </div>
      );
    }

    return result;
  };

  if (!isSameMonth(props.day, props.currentDate)) {
    return <div key={props.day.toString()} className="h-full w-full"></div>;
  } else {
    return (
      <div
        key={props.day.toString()}
        className={`overflow-y-scroll ${
          isToday(props.day) ? "bg-gray-200 " : ""
        } h-full w-full`}
      >
        <div className={`h-full w-full overflow-y-scroll`}>
          <div className="flex flex-col items-center justify-center">
            <div
              onClick={() => props.onDateClick(props.day, props.dayEvents)}
              className={`m-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full  ${
                props.isSelected
                  ? "bg-emotionDarkBlue text-white"
                  : "text-emotionDarkBlue"
              }`}
            >
              <label>{formattedDate}</label>
            </div>
            {renderCalendarEvents()}
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
