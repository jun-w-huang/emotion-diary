import { startOfWeek, endOfWeek, addDays } from "date-fns";
import CalendarWeekCell from "./CalendarWeekCell";
import { EmotionEvent } from "@prisma/client";

interface CalendarWeeklyViewProps {
  currentDate: Date;
  events: EmotionEvent[];
  onEventClick: (event: EmotionEvent) => void;
}

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const TimeSidebar = () => {
  const hourDisplays: JSX.Element[] = hours.map((hour) => {
    if (hour < 12) {
      if (hour === 0) {
        return <div key={hour} className="p-5">12AM</div>;
      } else {
        return <div key={hour} className="p-5">{hour}AM</div>;
      }
    } else {
      if (hour === 12) {
        return <div key={hour} className="p-5">12PM</div>;
      } else {
        return <div key={hour} className="p-5">{hour-12}PM</div>;
      }
    }
  });
  
  return <div className="">{hourDisplays}</div>;
};

const CalendarWeeklyView = (props: CalendarWeeklyViewProps) => {
  const startOfWeekDate = startOfWeek(props.currentDate, { weekStartsOn: 0 });
  const endOfWeekDate = endOfWeek(props.currentDate, { weekStartsOn: 0 });

  const days = [];
  let day = startOfWeekDate;

  while (day <= endOfWeekDate) {
    days.push(
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
      {days}
    </div>
  )
}

export default CalendarWeeklyView;
