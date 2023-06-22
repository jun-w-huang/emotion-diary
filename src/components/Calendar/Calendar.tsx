import { useContext, useState } from "react";
import { EmotionEvent } from "@prisma/client";
import { EmotionButton } from "../EmotionButton";
import React from "react";
import CalendarMonthlyView from "./Monthly/CalendarMonthlyView";
import CalendarWeeklyView from "./Weekly/CalendarWeeklyView";
import { CalendarNavbar } from "./CalendarNavbar";
import AddSVG from "../../../public/plus.svg";
import { useEmotionRHFModalContext } from "~/pages/context/EmotionRHFModalContext";

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
      <EmotionButton
        // This className overrides the Tailwind within the EmotionButton.tsx
        className="flex items-center gap-2 self-end text-emotionDarkBlue "
        onClick={() =>
          dispatch({
            type: "open new",
            date: new Date(),
          })
        }
        icon={<AddSVG />}
      >
        Add new event
      </EmotionButton>
    </div>
  );
};

export const MemoizedCalendar = React.memo(Calendar);
