import { startOfWeek, endOfWeek, addDays } from "date-fns";
import CalendarWeekCell from "./CalendarWeekCell";
import CalendarWeekHeader from "./CalendarWeekHeader";
import { EmotionEvent } from "@prisma/client";

interface CalendarWeeklyViewProps {
  currentDate: Date;
  events: EmotionEvent[];
  onEventClick: (event: EmotionEvent) => void;
}

const TimeSidebar = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? "AM" : "PM";
    return (
      <div key={`${hour}${period}`} className="p-5">
        {hour}
        {period}
      </div>
    );
  });

  return (
    <div className="">
      {/* this div is to account for header height, so that the hours are displayed alongside WeekCells */}
      <div className="py-12"></div>
      {hours}
    </div>
  );
};

const CalendarWeeklyView = (props: CalendarWeeklyViewProps) => {
  const startOfWeekDate = startOfWeek(props.currentDate, { weekStartsOn: 0 });
  const endOfWeekDate = endOfWeek(props.currentDate, { weekStartsOn: 0 });

  // The CalendarWeekCells where events are displayed
  const weekCells = [];
  let day = startOfWeekDate;

  while (day <= endOfWeekDate) {
    weekCells.push(
      <CalendarWeekCell
        key={day.toString()}
        day={day}
        currentDate={new Date()}
        monthEvents={props.events}
        onEventClick={props.onEventClick}
      />
    );
    day = addDays(day, 1);
  }

  return (
    <div className="flex h-full">
      <TimeSidebar />
      <div className="flex flex-1 flex-col">
        <CalendarWeekHeader currentDate={props.currentDate} />
        <div className="flex flex-grow">{weekCells}</div>
      </div>
    </div>
  );
};

export default CalendarWeeklyView;
