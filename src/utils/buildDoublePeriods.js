import {formatDate} from "@/utils/date/formatDate.js";


export const buildDoublePeriods = (
    current,
    previous,
    period
) => [
    {
        from: formatDate(current.startDate),
        to: formatDate(current.endDate),
        period,
    },
    {
        from: formatDate(previous.prevStartDate),
        to: formatDate(previous.prevEndDate),
        period,
    },
];
