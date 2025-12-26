import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ComposableMap, Geographies, Geography, Graticule, Sphere} from "react-simple-maps";
import {scaleLinear} from "d3-scale";
import iso from "iso-3166-1";
import Skeleton from "@/components/skeleton/Skeleton.jsx";

const GEO_URL =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMapChart = ({mapData}) => {
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [isRotating, setIsRotating] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [lastCoords, setLastCoords] = useState([0, 0]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [tooltip, setTooltip] = useState("");
    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        setIsRotating(false);
    };

    const data = useMemo(() => {
        if (!mapData) return {};
        const responseData = mapData['countryNews'];
        return Object.entries(responseData)
            .filter(([countryIso]) =>
                countryIso !== 'UN' &&
                countryIso !== 'EU' &&
                countryIso !== 'UK'
            )
            .map(([countryIso, stats]) => {
                const country = iso.whereAlpha2(countryIso);
                if (!country) return null;

                return {
                    id: country.numeric,
                    name: country.country,
                    value: Number(stats.avgSentiment.toFixed(2)) * 100,
                    newsCount: stats.newsCount,
                    positive: stats.positive,
                    neutral: stats.neutral,
                    negative: stats.negative,
                    avgSentiment: Number(stats.avgSentiment).toFixed(2),
                };
            })
            .filter(Boolean);
    }, [mapData]);


    const handleBackgroundClick = () => {
        setSelectedCountry(null);
        setIsRotating(true);
    };

    useEffect(() => {
        let animationFrame;
        const rotate = () => {
            if (isRotating && !isDragging) {
                setRotation(([lon, lat, tilt]) => [lon + 0.2, lat, tilt]);
            }
            animationFrame = requestAnimationFrame(rotate);
        };

        rotate();
        return () => cancelAnimationFrame(animationFrame);
    }, [isRotating, isDragging]);

    const handleMouseDown = (evt) => {
        setIsDragging(true);
        setLastCoords([evt.clientX, evt.clientY]);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = useCallback(
        (evt) => {
            if (!isDragging) return;

            const [lx, ly] = lastCoords;
            const dx = evt.clientX - lx;
            const dy = evt.clientY - ly;

            setLastCoords([evt.clientX, evt.clientY]);

            setRotation(([lon, lat, tilt]) => [
                lon + dx * 0.7,
                Math.max(Math.min(lat - dy * 0.7, 90), -90),
                tilt
            ]);
        },
        [isDragging, lastCoords]
    );

    const handleTouchStart = (evt) => {
        if (evt.touches.length !== 1) return;
        setIsDragging(true);

        const touch = evt.touches[0];
        setLastCoords([touch.clientX, touch.clientY]);
    };

    const handleTouchMove = useCallback(
        (evt) => {
            if (!isDragging || evt.touches.length !== 1) return;

            const touch = evt.touches[0];
            const [lx, ly] = lastCoords;
            const dx = touch.clientX - lx;
            const dy = touch.clientY - ly;

            setLastCoords([touch.clientX, touch.clientY]);

            setRotation(([lon, lat, tilt]) => [
                lon + dx * 0.7,
                Math.max(Math.min(lat - dy * 0.7, 90), -90),
                tilt
            ]);
        },
        [isDragging, lastCoords]
    );

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const colorScale = scaleLinear()
        .domain([-30.0, 0, 30.0])
        .range(["#EF4444", "rgb(240,233,233)", "#10B981"]);

    if (!mapData) {
        return <Skeleton/>;
    }

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                userSelect: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "center",
                position: "relative",
                height: '350px',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {tooltip && (
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        background: "rgba(117,117,117,0.7)",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        pointerEvents: "none",
                        whiteSpace: "pre-line"
                    }}
                >
                    {tooltip}
                </div>
            )}

            <ComposableMap
                projection="geoOrthographic"
                projectionConfig={{scale: 250, rotate: rotation}}
                width={800}
                height={500}
                style={{cursor: isDragging ? "grabbing" : "grab"}}
                onMouseDown={handleMouseDown}
                onClick={handleBackgroundClick}


            >
                <Sphere stroke="#ccc" strokeWidth={0.8} fill="#f1f5f9"/>
                <Graticule stroke="#e2e8f0" strokeWidth={0.5}/>

                <Geographies geography={GEO_URL}>
                    {({geographies}) =>
                        geographies.map((geo) => {
                            const currentCountry = data.find(item => item.id === geo.id);

                            return (
                                <Geography
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        handleCountryClick(currentCountry);
                                    }}
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={currentCountry ? colorScale(currentCountry.value) : "rgb(240,233,233)"}
                                    onMouseEnter={() => {

                                        setTooltip(currentCountry ? `${currentCountry.name}
                                                                            News Count: ${currentCountry.newsCount}
                                                                            Positive: ${currentCountry.positive}
                                                                            Negative: ${currentCountry.negative}
                                                                            Neutral: ${currentCountry.neutral}
                                                                            Avg Sentiment: ${currentCountry.avgSentiment}`
                                            : geo.properties.name)
                                    }
                                    }
                                    stroke="#94a3b8"
                                    strokeWidth={0.6}
                                    style={{
                                        default: {outline: "none"},
                                        hover: {
                                            fill: "#64748b",
                                            cursor: "pointer",
                                            outline: "none",
                                        },
                                        pressed: {outline: "none"},
                                    }}
                                    onMouseLeave={() => setTooltip("")}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default WorldMapChart;
