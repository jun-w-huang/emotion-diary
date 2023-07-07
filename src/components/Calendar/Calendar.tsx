import { useEffect, useState } from "react";
import type { EmotionEvent } from "@prisma/client";
import React from "react";
import CalendarMonthlyView from "./Monthly/CalendarMonthlyView";
import CalendarWeeklyView from "./Weekly/CalendarWeeklyView";
import { CalendarNavbar } from "./CalendarNavbar";
import AddSVG from "../../../public/plus.svg";
import { useEmotionRHFModalContext } from "~/context/EmotionRHFModalContext";
import { useDetailedDayModalContext } from "~/context/DetailedDayModalContext";
import { format } from "date-fns";

interface CalendarProps {
  events: EmotionEvent[];
}

const Calendar = (props: CalendarProps) => {
  // currentDate is used to render which month / week should be displayed in the calendar
  // and also the currentDate's cell will be a different color.
  const [currentDate, setCurrentDate] = useState(new Date());
  // Current view mode options are : month | week
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  const { dispatch } = useEmotionRHFModalContext();

  const { dispatch : DDMDispatch } = useDetailedDayModalContext();

  // this useEffect runs only when the Calendar first is opened and will set the DetailedDayModal
  // to display today's date.
  useEffect(() => {
    console.log("useeffect")
    //find today's events
    const dayEvents = props.events.filter(
      (event) =>
        format(event.start, "MM/dd/yyyy") ===
        format(new Date(), "MM/dd/yyyy")
    );

    DDMDispatch({
      type: "open selected",
      date: new Date(),
      dateEvents: dayEvents,
    })
  }, [])

  return (
    <div className="flex max-h-full w-full flex-1 flex-col bg-white p-4">
      <CalendarNavbar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <div className="flex-1 overflow-y-scroll">
        {viewMode === "month" ? (
          <CalendarMonthlyView
            currentDate={currentDate}
            events={props.events}
          />
        ) : (
          <CalendarWeeklyView currentDate={currentDate} events={props.events} />
        )}
      </div>
      {/* add new event button */}
      <button
        className="flex items-center gap-2 self-end text-emotionDarkBlue "
        onClick={() =>
          dispatch({
            type: "open new",
            date: new Date(),
          })
        }
      >
        <AddSVG />
        <h2>Add new event</h2>
      </button>
    </div>
  );
};

export const MemoizedCalendar = React.memo(Calendar);
