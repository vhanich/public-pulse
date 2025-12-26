import React from 'react';
import Skeleton from "@/components/skeleton/Skeleton.jsx";

const NewsCard = ({label, title, summary}) => {
    const sentimentStyles = {
        POSITIVE: {
            border: 'border-l-emerald-600',
            badge: 'bg-emerald-100 text-emerald-700',
            label: 'Positive'
        },
        NEGATIVE: {
            border: 'border-l-rose-600',
            badge: 'bg-rose-100 text-rose-700',
            label: 'Negative'
        },
        NEUTRAL: {
            border: 'border-l-gray-400',
            badge: 'bg-gray-100 text-gray-600',
            label: 'Neutral'
        }
    };

    const currentStyle = sentimentStyles[label] || sentimentStyles.NEUTRAL;

    if (!title && !summary) {
        return <Skeleton height='160px' className="rounded-lg"/>;
    }

    return (
        <div className={`
            w-full flex flex-col p-5 bg-white 
            rounded-lg shadow-md border border-gray-100 
            border-l-4 ${currentStyle.border} 
            transition-all hover:shadow-lg
        `}>

            <div className="mb-3">
                <span className={`
                    px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    ${currentStyle.badge}
                `}>
                    {currentStyle.label}
                </span>
            </div>

            <h4 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                {title}
            </h4>

            <p className="text-gray-600 text-sm leading-relaxed ">
                {summary}
            </p>
        </div>
    );
};

export default NewsCard;