import { format } from "date-fns";
import { ViewModeToggle } from "./ViewModeToggle";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  viewMode: "month" | "week";
  setViewMode: React.Dispatch<React.SetStateAction<"month" | "week">>;
}

export const CalendarHeader = (props: CalendarHeaderProps) => {
  const dateFormat = "MMMM yyyy";
  return (
    <div className="flex items-center justify-between p-3">
      <div className="text-2xl font-semibold text-gray-800">
        {format(props.currentDate, dateFormat)}
      </div>
      <div className="flex space-x-2">
        <button
          className="mr-2 rounded-md border px-2 py-1"
          onClick={() => {
            if (props.viewMode === "month") {
              props.setCurrentDate(
                new Date(
                  props.currentDate.getFullYear(),
                  props.currentDate.getMonth() - 1,
                  props.currentDate.getDate()
                )
              );
            } else {
              props.setCurrentDate(
                new Date(
                  props.currentDate.getFullYear(),
                  props.currentDate.getMonth(),
                  props.currentDate.getDate() - 7
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
            if (props.viewMode === "month") {
              props.setCurrentDate(
                new Date(
                  props.currentDate.getFullYear(),
                  props.currentDate.getMonth() + 1,
                  props.currentDate.getDate()
                )
              );
            } else {
              props.setCurrentDate(
                new Date(
                  props.currentDate.getFullYear(),
                  props.currentDate.getMonth(),
                  props.currentDate.getDate() + 7
                )
              );
            }
          }}
        >
          Next
        </button>
        <ViewModeToggle viewMode={props.viewMode} setViewMode={props.setViewMode}/>
      </div>
    </div>
  );
};
