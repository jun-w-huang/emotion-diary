import { startOfWeek, endOfWeek, addDays, format } from "date-fns";
import CalendarWeekCell from "./CalendarWeekCell";
import CalendarWeekHeader from "./CalendarWeekHeader";
import { EmotionEvent } from "@prisma/client";
import CalendarWeekHeaderCell from "./CalendarWeekHeaderCell";
import { useDetailedDayModalContext } from "~/context/DetailedDayModalContext";

interface CalendarWeeklyViewProps {
  currentDate: Date;
  events: EmotionEvent[];
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

const renderTimelines = () => {
  const lines = Array.from({ length: 24 }, (_, i) => {
    return (
      <div key={i} className="h-16 border-b w-full z-0">
        
      </div>
    );
  });

  return (
    <div className="absolute mx-auto inset-0 z-0">
      <div className="relative top-16 ">
        {lines}
      </div>
    </div>
  )

}

const CalendarWeeklyView = (props: CalendarWeeklyViewProps) => {
  const startOfWeekDate = startOfWeek(props.currentDate, { weekStartsOn: 0 });
  const endOfWeekDate = endOfWeek(props.currentDate, { weekStartsOn: 0 });

  const { state } = useDetailedDayModalContext();

  // The CalendarWeekCells where events are displayed
  const weekCells = [];
  // CalendarWeekHeaderCells, which are put in the header, 
  // there is one cell for each day of the week
  // user can click on the date of each header to control the DetailedDayModal
  const headerCells = [];
  let day = startOfWeekDate;

  while (day <= endOfWeekDate) {

    const dayEvents = props.events
    .filter(
      (event) =>
        format(new Date(event.start), "MM/dd/yyyy") ===
        format(day, "MM/dd/yyyy")
    )
    .sort((eventA, eventB) => {
      // Compare the start dates
      if (eventA.start.getTime() !== eventB.start.getTime()) {
        return eventA.start.getTime() - eventB.start.getTime();
      }

      // If the start dates are the same, compare the end dates
      // Ordered so that the event that ends first is ordered AFTER.
      const endDateA = eventA.end || eventA.start;
      const endDateB = eventB.end || eventB.start;
      return endDateB.getTime() - endDateA.getTime();
    });

    weekCells.push(
      <CalendarWeekCell
        key={day.toString()}
        day={day}
        currentDate={new Date()}
        dayEvents={dayEvents}
      />
    );

    const isSelected = format((state.date), "MM/dd/yyyy") ===
    format(day, "MM/dd/yyyy")

    headerCells.push(
      <CalendarWeekHeaderCell isSelected={isSelected} key={day.toString()} day={day} dayEvents={dayEvents}/>
    )
    day = addDays(day, 1);
  }

  return (
    <div className="flex">
      <TimeSidebar />
      <div className="flex flex-1 flex-col relative">
      {renderTimelines()}
        <CalendarWeekHeader headerCells={headerCells}/>
        <div className="flex flex-grow">{weekCells}</div>
      </div>
    </div>
  );
};

export default CalendarWeeklyView;
