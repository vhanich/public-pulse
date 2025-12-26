import React from 'react';
import ReactECharts from "echarts-for-react";
import Skeleton from "@/components/skeleton/Skeleton.jsx";


const LineChart = ({sentiment}) => {
    if (!sentiment) {
        return <Skeleton/>;
    }

    const dates = sentiment.map(item => new Date(item.date));
    const avgScore = sentiment.map(item => item.avgScore.toFixed(2));
    const datesArray = dates.map(date => new Date(date)
        .toLocaleDateString('en-US',
            {month: 'short', day: 'numeric', year: 'numeric'}));

    const option = {
        title: {
            text: 'Sentiment Trends over time',
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                const index = params[0].dataIndex;
                const originalItem = sentiment[index];

                return `<div>
                    <b>${datesArray[index]}</b><br/>
                    Avg score: ${avgScore[index]}<br/>
                    Positive: ${originalItem.positive}<br/>
                    Neutral: ${originalItem.neutral}<br/>
                    Negative: ${originalItem.negative}<br/>
                </div>`;
            }
        },
        legend: {
            icon: 'path://M0,5 L30,5 L30,7 L0,7 Z',
            bottom: 3,
            data: ['Average Score'],
            selectedMode: false,
            itemStyle: {
                color: '#b9bbc3',
            },
            textStyle: {
                fontSize: 12,
                fontWeight: 'bold',
            }
        },
        grid: {
            left: '30',
            right: '25',
            bottom: '18%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: datesArray,
            axisLabel: {
                show: false,
                interval: 'auto',
                fontSize: 12,
                fontStyle: 'normal',
            },

            axisTick: {show: false},
            axisLine: {show: false},

        },
        yAxis: {
            axisLabel: {
                fontSize: 12,
                fontFamily: 'Roboto, sans-serif',
            },
            type: 'value',
            min: -1,
            max: 1,
            splitLine: {
                show: false
            }

        },
        visualMap: {
            show: false,
            pieces: [
                {gt: 0.05, color: '#93b8a5'},
                {lt: -0.05, color: '#d57073'},
                {gte: -0.05, lte: 0.05, color: '#b9bbc3'}
            ]
        },
        series: [
            {
                name: 'Average Score',
                type: 'line',
                data: avgScore,
                lineStyle: {
                    width: 2.5,
                    type: 'solid',

                },
                showSymbol: false,
                smooth: 0.3,
                markLine: {
                    symbol: 'none',
                    data: [{
                        yAxis: 0,
                        label: {
                            show: false,

                        }
                    }
                    ],
                    lineStyle: {
                        color: '#aaa',
                        width: 1,
                        type: 'solid'
                    }
                }
            }
        ],
        graphic: [
            {
                type: 'text',
                left: '5%',
                bottom: '10%',
                style: {
                    text: datesArray[0],
                    fontSize: 12,
                    fill: '#888'
                }
            },
            {
                type: 'text',
                right: '5%',
                bottom: '10%',
                style: {
                    text: datesArray[datesArray.length - 1],
                    fontSize: 12,
                    fill: '#888'
                }
            }
        ]

    };

    return (
        <ReactECharts option={option} style={{height: "350px", width: "100%"}}/>
    );
};

export default LineChart;