import { ReactNode } from "react";

interface CalendarWeekHeaderProps {
  headerCells: ReactNode[]
}

const CalendarWeekHeader = (props: CalendarWeekHeaderProps) => {

  return (
    <div className="relative z-10 flex h-24 rounded-4xl border bg-emotionLightBlue">
      {props.headerCells}
    </div>
  );
};

export default CalendarWeekHeader;
