import {differenceInDays, differenceInMonths} from "date-fns";

export const getPeriod = (range) => {
    const {startDate, endDate} = range[0];
    const months = differenceInMonths(endDate, startDate);
    const days = differenceInDays(endDate, startDate);
    let period = null;

    if (days > 0 && days <= 32) period = 'DAY';
    else if (months >= 1 && months <= 3) period = 'DAY';
    else if (months >= 3 && months <= 24) period = 'WEEK';
    else period = 'MONTH';
    return period;
};