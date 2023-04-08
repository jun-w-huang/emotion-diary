import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
} from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarMonthCell from "./CalendarMonthCell";
import CalendarWeekCell from "./CalendarWeekCell";
import CalendarMonthlyView from "./CalendarMonthlyView";
import CalendarWeeklyView from "./CalendarWeeklyView";

interface CalendarProps {
  events: EmotionEvent[];
}

const Calendar = (props: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between p-3">
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
          <button
            className="rounded-md border px-2 py-1"
            onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
          >
            {viewMode === "month" ? "Weekly View" : "Monthly View"}
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

  return (
    <div className="flex flex-col flex-1 rounded-lg border max-h-full bg-white shadow">
      <div className="">
        {header()}
        {weekDaysHeader()}
      </div>
      <div className="flex-auto overflow-y-scroll max-h-full">
        {viewMode === "month" ? (
          <CalendarMonthlyView
            currentDate={currentDate}
            events={props.events}
          />
        ) : (
          <CalendarWeeklyView currentDate={currentDate} events={props.events} />
        )}
      </div>
    </div>
  );
};

export default Calendar;
