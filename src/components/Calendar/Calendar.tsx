import { useState } from "react";
import { format } from "date-fns";
import { EmotionEvent } from "@prisma/client";
import CalendarWeeklyView from "./CalendarWeeklyView";
import CreateEmotionRHF from "../RHF/CreateEmotionRHF";
import { EmotionButton } from "../EmotionButton";
import React from "react";
import CalendarMonthlyView from "./CalendarMonthlyView";

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
  const [viewMode, setViewMode] = useState("month");
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
            onClick={() => {
              if (viewMode === "month") {
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    currentDate.getDate()
                  )
                );
              } else {
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() - 7
                  )
                );
              }
            }}
          >
            Previous
          </button>
          <button
            className="rounded-md border px-2 py-1"
            onClick={() => {
              if (viewMode === "month") {
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    currentDate.getDate()
                  )
                );
              } else {
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() + 7
                  )
                );
              }
            }}
          >
            Next
          </button>
          <button
            className="rounded-md border px-2 py-1"
            onClick={() => {
              setViewMode(viewMode === "month" ? "week" : "month");
            }}
          >
            {viewMode === "month" ? "Weekly View" : "Monthly View"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute flex max-h-full flex-col overflow-auto rounded-lg border bg-white shadow">
      <div className="">
        {header()}
        {/* <EmotionButton
          onClick={() =>
            setFormModalDetails({
              isShowingModal: true,
              date: new Date();
              currentEvent: undefined,
            })
          }
        >
          Add event
        </EmotionButton> */}
      </div>

      <div className="flex-auto overflow-y-scroll">
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
    </div>
  );
};

export const MemoizedCalendar = React.memo(Calendar);
