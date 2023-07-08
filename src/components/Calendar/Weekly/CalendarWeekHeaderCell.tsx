import { EmotionEvent } from "@prisma/client";
import { format, isToday } from "date-fns";
import { useDetailedDayModalContext } from "~/context/DetailedDayModalContext";

interface CalendarWeekHeaderCellProps {
  day: Date;
  dayEvents: EmotionEvent[];
  isSelected: boolean;
}

const DayHeader = (props: CalendarWeekHeaderCellProps) => {
  const { dispatch: DDMDispatch } = useDetailedDayModalContext();

  const onDateClick = () => {
    DDMDispatch({
      type: "open selected",
      date: props.day,
      dateEvents: props.dayEvents,
    });
  };

  return (
    <div
      key={props.day.toString()}
      className="flex w-1/7 cursor-pointer flex-col items-center justify-center text-white"
      onClick={onDateClick}
    >
      <span
        className={`font-bold ${props.isSelected ? "text-slate-600" : ""}`}
      >
        {format(props.day, "EEEE")}
      </span>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full  ${
          props.isSelected ? "border-8 border-slate-600 bg-slate-600" : ""
        }  font-medium`}
      >
        {props.day.getDate()}
      </div>
    </div>
  );
};

export default DayHeader;
