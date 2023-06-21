import { useState } from "react";
import { format } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CreateEmotionRHF from "../RHF/CreateEmotionRHF";
import { EmotionButton } from "../EmotionButton";
import React from "react";
import CalendarMonthlyView from "./Monthly/CalendarMonthlyView";
import CalendarWeeklyView from "./Weekly/CalendarWeeklyView";
import { CalendarHeader } from "./CalendarHeader";

interface CalendarProps {
  events: EmotionEvent[];
}

export interface FormModalDetails {
  isShowingModal: boolean;
  date: Date | undefined;
  currentEvent: EmotionEvent | undefined;
}

const Calendar = (props: CalendarProps) => {
  // currentDate is used to render which month / week should be displayed in the calendar
  // and also the currentDate's cell will be a different color.
  const [currentDate, setCurrentDate] = useState(new Date());
  // Current view mode options are : month | week
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [formModalDetails, setFormModalDetails] = useState<FormModalDetails>({
    isShowingModal: false,
    date: new Date(),
    currentEvent: undefined,
  });

  const onEventClick = (event: EmotionEvent) => {
    setFormModalDetails({
      isShowingModal: true,
      date: event.start,
      currentEvent: event,
    });
  };

  return (
    <div className="flex max-h-full w-full flex-1 flex-col rounded-lg border bg-white p-4 shadow">
        <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} viewMode={viewMode} setViewMode={setViewMode}/>
      <div className="flex-1 overflow-y-scroll">
        {formModalDetails.isShowingModal && (
          <CreateEmotionRHF
            existingEvent={formModalDetails.currentEvent}
            closeModal={() =>
              setFormModalDetails({
                isShowingModal: false,
                date: undefined,
                currentEvent: undefined,
              })
            }
          />
        )}
        {viewMode === "month" ? (
          <CalendarMonthlyView
            currentDate={currentDate}
            events={props.events}
            onEventClick={onEventClick}
            onAddEventClick={(date: Date) => {
              setFormModalDetails({
                isShowingModal: true,
                date: date,
                currentEvent: undefined,
              });
            }}
          />
        ) : (
          <CalendarWeeklyView
            currentDate={currentDate}
            events={props.events}
            onEventClick={onEventClick}
          />
        )}
      </div>
      <EmotionButton
        onClick={() =>
          setFormModalDetails({
            isShowingModal: true,
            date: new Date(),
            currentEvent: undefined,
          })
        }
      >
        Add event
      </EmotionButton>
    </div>
  );
};

export const MemoizedCalendar = React.memo(Calendar);
