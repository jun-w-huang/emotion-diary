import React from "react";
import { format, isSameMonth, isToday } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarMonthEvent, { MonthEvent } from "./CalendarMonthEvent";
import { useDetailedDayModalContext } from "~/context/DetailedDayModalContext";
import DownArrowSVG from "../../../../public/down_arrow.svg";

interface CellProps {
  day: Date;
  currentDate: Date;
  dayEvents: EmotionEvent[];
  isSelected: boolean;
}

const CalendarMonthCell = (props: CellProps) => {
  const { dispatch } = useDetailedDayModalContext();

  const onDateClick = () => {
    dispatch({
      type: "open selected",
      date: props.day,
      dateEvents: props.dayEvents,
    });
  };

  const formatDay = "d";
  const formattedDate = format(props.day, formatDay);

  const renderCalendarEvents = () => {
    const result = [];

    const shownEvents = props.dayEvents.slice(0, 2);
    shownEvents.map((event) => {
      result.push(<CalendarMonthEvent key={event.id} event={event} />);
    });
    if (props.dayEvents.length > 2) {
      result.push(
        <MonthEvent key={"rest"} onClick={onDateClick}>
          <div className="w-6 flex pl-1">
            <DownArrowSVG className="" />
          </div>
          <p className="truncate text-sm font-bold">
            + {props.dayEvents.length - 2} more
          </p>
        </MonthEvent>
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
              onClick={onDateClick}
              className={`m-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full  ${
                props.isSelected
                  ? "bg-emotionDarkBlue text-white"
                  : "text-emotionDarkBlue"
              }`}
            >
              <label className="cursor-pointer">{formattedDate}</label>
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
