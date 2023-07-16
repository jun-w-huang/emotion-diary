import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const utcToLocal = (date: Date): Date => {
    const utcOffset = date.getTimezoneOffset();
    return dayjs(date).add(utcOffset, "minute").toDate()
}