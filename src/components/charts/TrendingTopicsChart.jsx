import React, {useCallback, useEffect, useMemo, useState,} from 'react';
import {Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import '../../index.css'
import Skeleton from "@/components/skeleton/Skeleton.jsx";

const COLORS = {
    'Renewable Energy': {stroke: '#2ECC71', fill: '#2ECC71'},
    'Fossil Fuels': {stroke: '#2C3E50', fill: '#2C3E50'},
    'Climate Change': {stroke: '#E67E22', fill: '#E67E22'},
    'Biodiversity Land': {stroke: '#9B59B6', fill: '#9B59B6'},
    'Waste Recycling': {stroke: '#F1C40F', fill: '#F1C40F'},
    'Air Pollution': {stroke: '#3498DB', fill: '#3498DB'},
    'Water Pollution': {stroke: '#2980B9', fill: '#2980B9'},
    'Public Health': {stroke: '#E74C3C', fill: '#E74C3C'},
    'Extreme Events': {stroke: '#FF4757', fill: '#FF4757'},
    'Social Risks': {stroke: '#FFA502', fill: '#FFA502'},
    'Fines Sanctions': {stroke: '#8E44AD', fill: '#8E44AD'},
    'Other': {stroke: '#BDC3C7', fill: '#BDC3C7'}
};
const INITIAL_DURATION = 1000;
const UPDATE_DURATION = 500;

const transformData = (topics) => {
    const topicsDates = Object.keys(topics.topics)
        .sort((a, b) => new Date(a) - new Date(b));

    const datesArray = topicsDates.map(item => new Date(item).toLocaleDateString('en-US', {
        month: "short",
        day: "numeric",
        year: "numeric"
    }));
    const allTopics = Object.values(topics.topics).flat();
    const categories = [...new Set(allTopics.map(t => t.name))];


    return topicsDates.map((date, index) => {
        const topicsOfDate = topics.topics[date] || [];
        const dataPoint = {name: datesArray[index]};
        categories.forEach(category => {
            const found = topicsOfDate.find(t => t.name === category);

            dataPoint[category] = found ? found.count : 0;
        });

        return dataPoint;
    });
};

const CustomLegend = ({payload, onClick, hiddenSeries}) => {
    const activeTextColor = 'rgb(8,8,8)';
    return (
        <ul style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 0,
            listStyle: 'none',
            margin: '10px 0 0 0',
            flexWrap: 'wrap',
        }}>
            {payload.map((entry) => {
                const isHidden = hiddenSeries[entry.value];
                const color = entry.color;

                return (
                    <li
                        key={entry.value}
                        onClick={() => onClick(entry)}
                        tabIndex="0"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'sans-serif',
                            fontSize: '12px',

                            margin: '0 10px 0px 10px',
                            color: isHidden ? '#999' : activeTextColor,
                            opacity: isHidden ? 0.6 : 1,
                            cursor: 'pointer',
                            userSelect: 'none',
                            transition: 'opacity 0.3s, color 0.3s',
                            outline: 'none',

                        }}
                    >
                        <svg width="10" height="10" style={{marginRight: 5}}>
                            <circle cx="5" cy="5" r="5" fill={color}/>
                        </svg>
                        {entry.value}
                    </li>
                );
            })}
        </ul>
    );
};

const DatadogTooltip = ({active, payload, label, hoveredSeriesName}) => {

    if (active && payload && payload.length) {
        const total = calculateTotal(payload);
        const showOnlyOne = !!hoveredSeriesName;

        return (
            <div style={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '4px',
                boxShadow: 'rgba(0, 0, 0, 0.2) 1px 2px 10px'
            }}>
                <p style={{
                    fontWeight: 'bold', fontFamily: 'sans-serif',
                    color: 'rgba(109, 110, 115)', fontSize: '14px', margin: '0 0 5px 0'
                }}>{label}</p>

                {showOnlyOne ? (
                    payload
                        .filter(item => item.name === hoveredSeriesName)
                        .map((item, index) => (
                            <p key={index} style={{
                                color: 'rgba(109, 110, 115)', fontFamily: 'sans-serif',
                                fontSize: '14px'
                            }}>
                                {`${item.name}: ${item.value}`}
                            </p>
                        ))
                ) : (
                    <>
                        {payload.map((item, index) => (
                            <p key={index} style={{
                                color: 'rgba(109, 110, 115)', fontFamily: 'sans-serif',
                                fontSize: '14px'
                            }}>
                                {`${item.name}: ${item.value}`}
                            </p>
                        ))}
                        <hr style={{margin: '5px 0'}}/>
                        <p className="total" style={{
                            fontWeight: 'bold', fontFamily: 'sans-serif',
                            color: 'rgba(109, 110, 115)', fontSize: '14px', margin: '0 0 5px 0'
                        }}>
                            {`Total: ${total}`}
                        </p>
                    </>
                )}
            </div>
        );
    }
    return null;
};
const calculateTotal = (payload) => {
    if (!payload || payload.length === 0) return 0;

    const currentDataPoint = payload[0].payload;
    let total = 0;
    Object.values(currentDataPoint)
        .filter(i => typeof i !== 'string')
        .forEach(i => total += i);

    return total;
};

const CustomXAxisTick = ({x, y, payload, index, totalTicks}) => {
    let dxValue = 0;

    if (index === 0) {
        dxValue = -25;
    } else if (index === totalTicks - 1) {
        dxValue = -10;
    }

    if (index !== 0 && index !== totalTicks - 1) {
        return null;
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={dxValue}
                y={0}
                dy={15}
                textAnchor={index === 0 ? 'start' : 'end'}
                fill='rgb(136,136,136)'
                fontFamily='sans-serif'
                fontSize={12}
            >
                {payload.value}
            </text>
        </g>
    );
};


const TrendingTopicsChart = ({topics}) => {
    const [hiddenSeries, setHiddenSeries] = useState({});
    const [hoveredSeriesName, setHoveredSeriesName] = useState(null);
    const [animationDuration, setAnimationDuration] = useState(INITIAL_DURATION);
    const [isInitialAnimationActive, setIsInitialAnimationActive] = useState(true);

    const chartData = useMemo(() => {
        if (!topics) return [];
        return transformData(topics);
    }, [topics]);
    const categories = useMemo(() => Object.keys(COLORS), []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationDuration(UPDATE_DURATION);
            setIsInitialAnimationActive(false);
        }, INITIAL_DURATION + 100);
        return () => clearTimeout(timer);
    }, []);

    const handleLegendClick = useCallback((data) => {
        const name = data.value;
        const visibleCount = categories.length - Object.keys(hiddenSeries).length;
        const isClickedHidden = !!hiddenSeries[name];
        const isClickedSolo = (visibleCount === 1) && !isClickedHidden;

        let newHiddenSeries = {...hiddenSeries};

        if (isClickedSolo) {
            newHiddenSeries = {};
        } else if (isClickedHidden) {
            delete newHiddenSeries[name];
        } else {
            if (visibleCount > 1 || visibleCount === categories.length) {
                newHiddenSeries = categories.reduce((acc, cat) => {
                    if (cat !== name) {
                        acc[cat] = true;
                    }
                    return acc;
                }, {});
            } else {
                newHiddenSeries[name] = true;
            }
        }
        setHiddenSeries(newHiddenSeries);
    }, [hiddenSeries, categories]);

    const handleSeriesMouseOver = useCallback((category) => {
        if (!hiddenSeries[category]) {
            setHoveredSeriesName(category);
        }
    }, [hiddenSeries]);

    const handleSeriesMouseLeave = useCallback(() => {
        setHoveredSeriesName(null);
    }, []);

    const handleChartMouseLeave = useCallback(() => {
        setHoveredSeriesName(null);
    }, []);


    if (!topics) {
        return <Skeleton/>;
    }

    return (<div>
        <h2 style={{
            textAlign: 'center',
            fontSize: '18px',
            color: '#333',
            marginBottom: '5px',
            fontWeight: 'bold',
            marginTop: '15px',
        }}
        >
            Trending Topics over time
        </h2>
        <ResponsiveContainer width="100%" height={400} padding={0}>

            <AreaChart
                data={chartData}
                margin={{top: 10, right: 30, left: 0, bottom: 10}}
                onMouseLeave={handleChartMouseLeave}
            >
                <XAxis
                    dataKey="name"
                    tickLine={false}
                    tick={(props) => (
                        <CustomXAxisTick
                            {...props}
                            totalTicks={chartData.length}
                        />
                    )}
                    interval={0}
                />

                <YAxis tickLine={false} axisLine={false} tick={{fontSize: 12, fontFamily: 'Roboto, sans-serif',}}/>

                <Tooltip
                    cursor={{
                        stroke: '#999',
                        strokeWidth: 1,
                        strokeDasharray: '3 3',
                        strokeOpacity: 0.7
                    }}
                    content={(props) => (
                        <DatadogTooltip {...props} hoveredSeriesName={hoveredSeriesName}/>)}
                />

                <Legend
                    content={(props) => (
                        <CustomLegend
                            {...props}
                            onClick={handleLegendClick}
                            hiddenSeries={hiddenSeries}
                        />
                    )}
                />

                {categories.map((category) => {
                    const opacity = (hoveredSeriesName && hoveredSeriesName !== category) ? 0.2 : 1;
                    const color = COLORS[category].stroke;
                    return (
                        <Area
                            key={category}
                            type="monotone"
                            dataKey={category}
                            stackId="1"
                            stroke={color}
                            fill={COLORS[category].fill}
                            fillOpacity={opacity}
                            strokeOpacity={opacity}
                            activeDot={{
                                r: 3,
                                fill: 'white',
                                stroke: COLORS[category].stroke,
                                strokeWidth: 1.5
                            }}
                            hide={!!hiddenSeries[category]}
                            name={category}
                            isAnimationActive={true}
                            animationDuration={animationDuration}
                            onMouseOver={() => handleSeriesMouseOver(category)}
                            onMouseLeave={handleSeriesMouseLeave}
                        />
                    );
                })}
            </AreaChart>
        </ResponsiveContainer>
    </div>);
};

export default TrendingTopicsChart;

