import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// 4PM UTC will become 4PM EDT
export const utcToLocal = (date: Date): Date => {
    const utcOffset = date.getTimezoneOffset();
    return dayjs(date).add(utcOffset, "minute").toDate()
}

// 4PM EDT will become 4PM UTC
export const localToUTC = (date: Date): Date => {
    const utcOffset = -date.getTimezoneOffset();
    return dayjs(date).add(utcOffset, "minute").toDate()
}