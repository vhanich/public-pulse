import React from 'react';

const DataContainer = ({title, value}) => {
    return (
        <div className='w-full sm:w-1/3   flex flex-col items-center p-2 md:p-4 space-y-2  border-2 border-gray-200 rounded-md shadow'>
            <h6>{title}</h6>
            <p className='text-lg text-bold lg:text-4xl'>{value}</p>
        </div>
    );
};

export default DataContainer;