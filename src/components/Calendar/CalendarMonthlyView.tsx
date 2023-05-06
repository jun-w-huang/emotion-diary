import { startOfMonth, startOfWeek, addDays } from "date-fns";
import CalendarMonthCell from "./CalendarMonthCell";
import { EmotionEvent } from "@prisma/client";

interface CalendarMonthlyViewProps {
    currentDate: Date,
    events: EmotionEvent[],
    onEventClick: (event: EmotionEvent) => void;
}

const CalendarMonthlyView = (props: CalendarMonthlyViewProps) => {
    const monthStart = startOfMonth(props.currentDate);
    const startDate = startOfWeek(monthStart);

    const rows = [];
    let days = [];
    let day = startDate;
    // Ensure that there are 6 rows in the calendar. 
    // Some months might only have 5 if the days of the week align in a certain way.
    while (rows.length < 6) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <CalendarMonthCell
            key={day.toString()}
            day={day}
            currentDate={new Date()}
            monthEvents={props.events}
            onEventClick={props.onEventClick}
          />
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={rows.length} className="flex">
          {days}
        </div>
      );
      days = [];
    }

    return (
        <div>
            {rows}
        </div>
            

    );
  };

  export default CalendarMonthlyView;