export const QUERY_HANDLERS = {
    sentiment: {
        type: 'single',
        setter: 'setSentiment',
    },
    geo: {
        type: 'single',
        setter: 'setMapData',
    },
    tone: {
        type: 'single',
        setter: 'setToneDistribution',
    },
    'topics-overtime': {
        type: 'single',
        setter: 'setTrendingTopics',
    },

    articles: {
        type: 'double',
        setter: 'setArticles',
    },
    global: {
        type: 'double',
        setter: 'setGlobalSentiment',
    },
    countries: {
        type: 'double',
        setter: 'setCountries',
    },
};
