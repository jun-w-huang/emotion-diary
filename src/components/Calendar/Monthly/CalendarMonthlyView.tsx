import {
  startOfMonth,
  startOfWeek,
  addDays,
  isSameDay,
  format,
} from "date-fns";
import { EmotionEvent } from "@prisma/client";
import { useEffect, useState } from "react";
import React from "react";
import CalendarMonthCell from "./CalendarMonthCell";
import DetailedDayModal from "./DetailedDayModal";

const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const weekDaysHeader = () => {
  return (
    <div className="flex rounded-3xl bg-slate-400 p-2 text-sm font-bold text-white">
      {weekdays.map((day) => (
        <div key={day} className="flex flex-1 justify-center py-2">
          {day}
        </div>
      ))}
    </div>
  );
};

export interface DetailedDayModalDetails {
  isShowingModal: boolean;
  dateEvents: EmotionEvent[];
}

interface CalendarMonthlyViewProps {
  currentDate: Date;
  events: EmotionEvent[];
  onAddEventClick: (date: Date) => void
  onEventClick: (event: EmotionEvent) => void;
}

const CalendarMonthlyView = (props: CalendarMonthlyViewProps) => {
  const monthStart = startOfMonth(props.currentDate);
  const startDate = startOfWeek(monthStart);
  // This state hook holds the details necessary for the DetailedDayModal and is passed as a prop to it.
  const [detailedDayModalDetails, setDetailedDayModalDetails] =
    useState<DetailedDayModalDetails>({
      isShowingModal: false,
      dateEvents: [],
    });
  const [selectedDate, setSelectedDate] = useState<Date>(props.currentDate);
  // This state hook will return an array of array of EmotionEvent. Each index represents a date in the month,
  // and each element is an array of that date's events. The length of the list will always be 42, because
  // our calendar view always has 6 weeks, each of 7 days.
  const [dateEvents, setDateEvents] = useState<EmotionEvent[][]>([]);

  // Recreate list of list of EmotionEvent if props.events or props.currentDate has changed
  // ie: Recreate if new events have been added/deleted/edited, or if the month being viewed has changed.
  useEffect(() => {
    function dateEvents(): EmotionEvent[][] {
      const result = [];
      let day = startDate;
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
          const dayEvents = props.events.filter(
            (event) =>
              format(new Date(event.start), "MM/dd/yyyy") ===
              format(day, "MM/dd/yyyy")
          );
          result.push(dayEvents);
          day = addDays(day, 1);
        }
      }
      return result;
    }
    setDateEvents(dateEvents());
  }, [props.events, props.currentDate]);

  const onDateClick = (date: Date, dateEvents: EmotionEvent[]) => {
    setDetailedDayModalDetails({
      isShowingModal: true,
      dateEvents: dateEvents,
    });
    setSelectedDate(date);
  };

  const days = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    // Ensure that there are 6 rows in the calendar, each with 7 days.
    // Some months might only have 5 if the days of the week align in a certain way.
    let index = 0;
    while (rows.length < 6) {
      for (let col = 0; col < 7; col++) {
        const isSelected = isSameDay(selectedDate, day);
        days.push(
          <CalendarMonthCell
            key={day.valueOf()}
            day={day}
            currentDate={props.currentDate}
            dayEvents={dateEvents[index] ?? []}
            onEventClick={props.onEventClick}
            onDateClick={onDateClick}
            isSelected={isSelected}
          />
        );
        index += 1;
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.valueOf()} className="flex ">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div>
      {weekDaysHeader()}
      {detailedDayModalDetails.isShowingModal &&
        detailedDayModalDetails.dateEvents && (
          <DetailedDayModal
            details={detailedDayModalDetails}
            date={selectedDate}
            onEventClick={props.onEventClick}
            onAddEventClick={props.onAddEventClick}
            closeModal={() =>
              setDetailedDayModalDetails({
                isShowingModal: false,
                dateEvents: [],
              })
            }
          />
        )}
      <div
        key={`${props.currentDate.getMonth()}-${props.currentDate.getFullYear()}`}
        className=""
      >
        {days()}
      </div>
    </div>
  );
};

export default React.memo(CalendarMonthlyView);