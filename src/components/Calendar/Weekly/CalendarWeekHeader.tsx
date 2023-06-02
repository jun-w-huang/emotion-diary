import { startOfWeek, endOfWeek, addDays, format, isToday } from "date-fns";

interface CalendarWeekHeaderProps {
  currentDate: Date;
}

const CalendarWeekHeader = (props: CalendarWeekHeaderProps) => {
  const startOfWeekDate = startOfWeek(props.currentDate, { weekStartsOn: 0 });
  const endOfWeekDate = endOfWeek(props.currentDate, { weekStartsOn: 0 });

  const dayHeaders = [];
  let day = startOfWeekDate;
  while (day <= endOfWeekDate) {
    if (isToday(day)) {
      dayHeaders.push(
        <div
          key={day.toString()}
          className="flex w-1/7 flex-col items-center justify-center text-white"
        >
          <span className="font-bold text-slate-600">
            {format(day, "EEEE")}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-8 border-slate-600 bg-slate-600 font-medium">
            {day.getDate()}
          </div>
        </div>
      );
    } else {
      dayHeaders.push(
        <div
          key={day.toString()}
          className="flex w-1/7 flex-col items-center justify-center text-white"
        >
          <span className="font-bold">{format(day, "EEEE")}</span>
          <div className="flex h-8 w-8 items-center justify-center font-medium">
            {day.getDate()}
          </div>
        </div>
      );
    }
    day = addDays(day, 1);
  }

  return (
    <div className="flex relative z-10 h-24 rounded-4xl border bg-slate-400">
      {dayHeaders}
    </div>
  );
};

export default CalendarWeekHeader;
