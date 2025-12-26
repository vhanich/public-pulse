import {formatDate} from "@/utils/date/formatDate.js";

export const buildSinglePeriod = (range, period) => {
    const {startDate, endDate} = range;

    return [
        {
            from: formatDate(startDate),
            to: formatDate(endDate),
            period,
        },
    ];
};
