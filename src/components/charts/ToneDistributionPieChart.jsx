import React, {useRef, useState} from 'react';
import ReactECharts from "echarts-for-react";
import Skeleton from "@/components/skeleton/Skeleton.jsx";

const ToneDistributionPieChart = ({tone}) => {
    if (!tone) {
        return <Skeleton/>;
    }

    const chartRef = useRef(null);

    const [activeName, setActiveName] = useState(
        Object.entries(tone).sort((a, b) => b[1] - a[1])[0][0]
    );

    const toneDistributionData = Object.entries(tone).map(([name, value]) => {
        const displayName = name[0] + name.slice(1).toLowerCase();
        return {
            name: displayName,
            value,
            selected: displayName === activeName,
        };
    });

    const option = {
        title: {
            text: 'Tone Distribution',
            left: 'center',
            top: '5%',
            textStyle: {
                fontSize: 20,
                fontWeight: 'bold'
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>Count: {c}<br/>Percent: {d}%',
            position: function (point, params, dom, rect, size) {
                return [point[0] + 10, point[1] + 10];
            }
        },
        legend: {
            bottom: '5%',
            left: 'center',

        },
        color: ["#64a8eb", "#69ccb3", "#898c96", "#ae7bb9"],
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,

                label: {
                    show: false,
                    position: 'center',
                    formatter: "{b}: {c}"
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: "bold",
                    },
                },

                labelLine: {
                    show: false
                },

                data: toneDistributionData,
            }
        ]
    };

    const onEvents = {
        selectchanged: (params) => {
            const selected = params.selected[0]?.name;
            if (selected) setActiveName(selected);
        }
    };


    return (
        <ReactECharts ref={chartRef} option={option} onEvents={onEvents} style={{height: "400px", width: "100%"}}/>

    );
};

export default ToneDistributionPieChart;