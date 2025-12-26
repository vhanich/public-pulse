export const getPreviousRange = (currentRange) => {
    const [{startDate, endDate}] = currentRange;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInDays = Math.round((end - start) / (1000 * 60 * 60 * 24));

    const prevEnd = new Date(start);
    prevEnd.setDate(prevEnd.getDate());

    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - diffInDays - 1);

    return {
        prevStartDate: prevStart,
        prevEndDate: prevEnd,
        key: "selection"
    };
};