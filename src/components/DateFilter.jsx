import React, {useEffect, useRef, useState} from 'react';
import {DateRange} from "react-date-range";
import {startOfYear, subDays, subMonths} from "date-fns";
import {Calendar as CalendarIcon, ChevronDown} from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateFilter = ({range, setRange}) => {
    const [open, setOpen] = useState(false);
    const [tempRange, setTempRange] = useState(range);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
                setTempRange(range);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [range]);

    const formatDate = (date) => date?.toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
    }) ?? "";

    const applyPresets = (start, end) => {
        setTempRange([{startDate: start, endDate: end, key: "selection"}]);
    };

    const presets = [
        {label: 'Last 7 days', start: subDays(new Date(), 7)},
        {label: 'Last 30 days', start: subDays(new Date(), 30)},
        {label: 'Last 3 Months', start: subMonths(new Date(), 3)},
        {label: 'Last 6 Months', start: subMonths(new Date(), 6)},
        {label: 'This Year', start: startOfYear(new Date())},
    ];

    return (
        <div ref={wrapperRef} className="relative w-full ">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full h-full gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:border-emerald-500 transition-all"
            >
                <CalendarIcon size={18} className="text-emerald-600"/>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                    <div
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 shadow-sm cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <input
                            className="w-20 lg:w-28 text-center text-xs lg:text-sm cursor-pointer outline-none"
                            value={formatDate(range[0].startDate)}
                            readOnly
                        />
                        <span>—</span>
                        <input
                            className="w-20 lg:w-28 text-center text-xs lg:text-sm cursor-pointer outline-none"
                            value={formatDate(range[0].endDate)}
                            readOnly
                        />
                    </div>
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}/>
            </button>

            {open && (
                <div
                    className="absolute top-full mt-2 left-0 right-0 md:left-auto md:right-0 md:w-[600px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">

                    <div
                        className="bg-gray-50/50 p-3 flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar border-b md:border-b-0 md:border-r border-gray-100 min-w-[140px]">
                        {presets.map((p) => (
                            <button
                                key={p.label}
                                onClick={() => applyPresets(p.start, new Date())}
                                className="whitespace-nowrap px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg transition-all md:text-left active:scale-95"
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 flex flex-col min-w-0 bg-white">
                        <div className="overflow-x-auto p-1 flex justify-center">
                            <DateRange
                                ranges={tempRange}
                                onChange={(item) => setTempRange([item.selection])}
                                months={1}
                                direction="horizontal"
                                showDateDisplay={false}
                                moveRangeOnFirstSelection={false}
                                rangeColors={['#10b981']}
                                minDate={new Date(2024, 0, 1)}
                                maxDate={new Date()}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-50 bg-gray-50/20">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setTempRange(range);
                                }}
                                className="text-sm font-bold text-gray-400 hover:text-gray-600 px-3 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setRange(tempRange);
                                    setOpen(false);
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-2 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateFilter;