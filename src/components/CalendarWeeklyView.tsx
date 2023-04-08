import { startOfWeek, endOfWeek, addDays } from "date-fns";
import CalendarWeekCell from "./CalendarWeekCell";
import { EmotionEvent } from "@prisma/client";

interface CalendarWeeklyViewProps {
  currentDate: Date;
  events: EmotionEvent[];
}

const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const TimeSidebar = () => {
  const hourDisplays: JSX.Element[] = hours.map((hour) => {
    return <div className="p-5">{hour}AM</div>;
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
      />
    );
    day = addDays(day, 1);
  }

  return (
    <div className="flex overflow-y-scroll border">
      <TimeSidebar />
      {days}
    </div>
  )
}

export default CalendarWeeklyView;
