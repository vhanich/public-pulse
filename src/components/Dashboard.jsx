import React, {useCallback, useEffect, useState} from 'react';
import LineChart from "@/components/charts/LineChart.jsx";
import WorldMapChart from "@/components/charts/WorldMapChart.jsx";
import NewsCard from "@/components/NewsCard.jsx";
import ToneDistributionPieChart from "@/components/charts/ToneDistributionPieChart.jsx";
import TrendingTopicsChart from "@/components/charts/TrendingTopicsChart.jsx";
import DateFilter from "@/components/DateFilter.jsx";
import {getToken} from "firebase/app-check";
import {appCheck} from "@/firebase/config.js";
import {subDays} from "date-fns";
import DataAnalyzeContainer from "@/components/charts/DataAnalyzeContainer.jsx";
import {getPreviousRange} from "@/utils/date/getPreviousRangeю.js";
import {getPeriod} from "@/utils/date/getPeriod.js";
import {QUERIES, QUERIES_DOUBLE_CHECK} from "@/config/queries.config.js";
import {buildSinglePeriod} from "@/utils/buildSinglePeriod.js";
import {buildDoublePeriods} from "@/utils/buildDoublePeriods.js";
import {fetchCharts, fetchNews} from "@/api/charts.api.js";
import {QUERY_HANDLERS} from "@/config/queryHandlers.config.js";

const token = await getToken(appCheck);

const Dashboard = () => {
    const [sentiment, setSentiment] = useState(null);
    const [mapData, setMapData] = useState(null);
    const [toneDistribution, setToneDistribution] = useState(null);
    const [trendingTopics, setTrendingTopics] = useState(null);
    const [articles, setArticles] = useState({current: null, previous: null,});
    const [globalSentiment, setGlobalSentiment] = useState({current: null, previous: null});
    const [countries, setCountries] = useState({current: null, previous: null,});
    const [latestNews, setLatestNews] = useState(null);
    const [range, setRange] = useState([
        {
            startDate: subDays(new Date(), 30),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const setters = {
        setSentiment,
        setMapData,
        setToneDistribution,
        setTrendingTopics,
        setArticles,
        setGlobalSentiment,
        setCountries,
    };

    const fetchQueryData = useCallback(
        async ({query, periods}) => {
            try {
                const result = await fetchCharts({
                    query,
                    periods,
                    token: token.token,
                });

                const config = QUERY_HANDLERS[query];
                if (!config) return;

                const setter = setters[config.setter];
                if (!setter) return;

                if (config.type === 'single') {
                    setter(result[0]);
                } else {
                    setter({
                        current: result[0],
                        previous: result[1],
                    });
                }
            } catch (error) {
                console.error(`Fetch error for ${query}`, error);
            }
        },
        [token.token]
    );


    const {startDate, endDate} = range[0];
    const period = getPeriod(range);
    const {prevStartDate, prevEndDate} = getPreviousRange(range);

    useEffect(() => {
        if (!token.token) return;

        const fetchData = async () => {

            QUERIES.forEach((query) => {
                const periods = buildSinglePeriod({startDate, endDate}, period);
                fetchQueryData({query, periods});
            });

            QUERIES_DOUBLE_CHECK.forEach((query) => {
                const periods = buildDoublePeriods(
                    {startDate, endDate},
                    {prevStartDate, prevEndDate},
                    period
                );
                fetchQueryData({query, periods});
            });


            try {
                const news = await fetchNews('today', token.token);
                setLatestNews(news);
            } catch (err) {
                console.error('Fetch news failed:', err);
            }
        };

        fetchData();
    }, [range, token.token]);


    return (
        <div className='w-full pb-15'>
            <div className='w-full flex flex-col sm:flex-row'>
                <div className='w-full md:w-2/3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mr-1'>
                    <DataAnalyzeContainer title='Total Articles' data={articles} range={range}/>
                    <DataAnalyzeContainer title='Avg Sentiment' data={globalSentiment} range={range}/>
                    <DataAnalyzeContainer title='Number Of Locations' data={countries} range={range}/>
                </div>
                <div className='w-full md:w-1/3 flex flex-col mt-2 sm:mt-0 sm:flex-row sm:ml-1'>
                    <DateFilter range={range} setRange={setRange}/>
                </div>
            </div>
            <div className='mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 '>
                <div className='w-full md:w-1/2 border-2 border-gray-200 rounded-md shadow'>
                    <LineChart sentiment={sentiment}/>
                </div>
                <div className='w-full md:w-1/2 border-2 border-gray-200 rounded-md shadow'>
                    <WorldMapChart mapData={mapData}/>
                </div>
            </div>
            <div className='mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 '>
                <div className='w-full md:w-2/3 border-2 border-gray-200 rounded-md shadow'>
                    <TrendingTopicsChart topics={trendingTopics}/>
                </div>
                <div className='w-full md:w-1/3 border-2 border-gray-200 rounded-md shadow'>
                    <ToneDistributionPieChart tone={toneDistribution}/>
                </div>
            </div>
            <div className='bottom-4'>
                <h3 className='text-center text-3xl font-semibold mt-4 mb-4'>Latest News</h3>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-15'>
                    {latestNews && latestNews.map((item, index) =>
                        <NewsCard
                            key={index}
                            label={item.label}
                            title={item.title}
                            summary={item.summary}
                        />)}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;