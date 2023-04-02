import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarCell from "./CalendarCell";

interface CalendarProps {
  events: EmotionEvent[];
}


const Calendar = (props: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="mb-6 flex justify-between">
        <div className="text-2xl font-semibold text-gray-800">
          {format(currentDate, dateFormat)}
        </div>
        <div className="flex space-x-2">
          <button
            className="mr-2 rounded-md border px-2 py-1"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
              )
            }
          >
            Previous
          </button>
          <button
            className="rounded-md border px-2 py-1"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekDaysHeader = () => {
    return (
      <div className="flex text-sm text-gray-600">
        {weekdays.map((day) => (
          <div key={day} className="flex flex-1 justify-center py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const dayEvents = props.events.filter((event) =>
          isSameDay(event.start, day)
        );

        days.push(<CalendarCell  key={day.toString()}
        day={day}
        currentDate={currentDate}
        monthEvents={props.events}/>);
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="flex">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {header()}
      {weekDaysHeader()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
