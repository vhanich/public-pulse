import React from 'react';
import Skeleton from "@/components/skeleton/Skeleton.jsx";
import {differenceInDays} from "date-fns";

const AnalyzeArticles = (current, previous) => {
    const diff = current - previous;
    const percent = previous === 0 ? null : ((diff / Math.abs(previous)) * 100).toFixed(2);
    let trend = 'no_change';

    if (current > previous) trend = 'increased';
    if (current < previous) trend = 'decreased';

    return {
        trend,
        diff,
        percent
    };
};

const getPeriodLabelForUI = (range) => {
    const {startDate, endDate} = range[0];
    const days = differenceInDays(endDate, startDate);

    if (days < 7) {
        return `${days} day${days !== 1 ? 's' : ''}`;
    }

    if (days < 30) {
        const weeks = Math.round(days / 7);
        return `${weeks} week${weeks !== 1 ? 's' : ''}`;
    }

    if (days < 365) {
        const months = Math.round(days / 30);
        return `${months} month${months !== 1 ? 's' : ''}`;
    }

    const years = Math.round(days / 365);
    return `${years} year${years !== 1 ? 's' : ''}`;
};

const formatNumber = (num) => {
    if (num === null || num === undefined) return '';

    if (Number.isInteger(num)) return num;

    const decimalPart = num.toString().split('.')[1];

    if (decimalPart && decimalPart.length > 2) {
        return +num.toFixed(2);
    }

    return num;
}

const DataAnalyzeContainer = ({title, data, range}) => {
    const current = data.current;
    const previous = data.previous;
    const result = AnalyzeArticles(current, previous);

    if (!data) return <Skeleton height='50px'/>;

    return (
        <div className='w-full sm:w-1/3  flex flex-col   p-1 lg:p-2 border-2 border-gray-200 rounded-md shadow'>
            <h6 className='flex text-sm justify-center'>{title}</h6>
            <span className='flex justify-center text-xl lg:text-2xl'>{formatNumber(current)}</span>
            <p className='flex justify-center space-x-2  text-xs'>
                <span>
                    {previous ? result.trend === 'increased' && (
                        <span className='text-[#10B981FF] font-bold'>↑ {result.percent}%</span>) : null}
                    {previous ? result.trend === 'decreased' && (
                        <span className='text-[#EF4444FF] font-bold'>↓ {result.percent}%</span>) : null}
                    {previous ? result.trend === 'no changes' && (
                        <span className='text-[#b9bbc3] font-bold'>{result.percent}%</span>) : null}
                </span>
                <span className='text-[9px]'>
                    {previous ? (`compared to the same ${getPeriodLabelForUI(range)}`) : null}
                </span>
            </p>


        </div>
    );
};

export default DataAnalyzeContainer;