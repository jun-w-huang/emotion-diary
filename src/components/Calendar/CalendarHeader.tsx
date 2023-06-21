import { format } from "date-fns";
import { ViewModeToggle } from "./ViewModeToggle";
// https://www.svgrepo.com/svg/27797/right-arrow
import RightArrowSVG from "../../../public/right_arrow.svg";
import LeftArrowSVG from "../../../public/left_arrow.svg";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  viewMode: "month" | "week";
  setViewMode: React.Dispatch<React.SetStateAction<"month" | "week">>;
}

export const CalendarHeader = (props: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="relative flex h-full items-center space-x-2">
        <h1 className="space-x-2">
          <span className="text-emotionDarkBlue">{format(props.currentDate, "MMMM")}</span>
          <span className="text-emotionGray">{format(props.currentDate, "yyyy")}</span>
        </h1>
        <div className="absolute top-0 bottom-0 left-44 flex h-full space-x-1">
          <button
            className="rounded-2xl border bg-emotionLightBlue px-3 py-1"
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
            <LeftArrowSVG height={15} width={15} color="white" />
          </button>
          <button
            className="rounded-2xl border bg-emotionLightBlue px-3 py-1"
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
            <RightArrowSVG height={15} width={15} color="white" />
          </button>
        </div>
      </div>
      <ViewModeToggle
        viewMode={props.viewMode}
        setViewMode={props.setViewMode}
      />
    </div>
  );
};
