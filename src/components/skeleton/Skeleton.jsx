import React from 'react';
import './skeleton.css';

const Skeleton = ({width = "100%", height = "400px"}) => {
    return (
        <div style={{
            width,
            height,
            display: 'flex',
            justifyContent: 'center',
            background: "linear-gradient(90deg, #eee 25%, #FFFFFFB3 37%, #eee 63%)",
            backgroundSize: "400% 100%",
            animation: "skeleton 1.5s linear infinite",
        }}>

        </div>
    );
};

export default Skeleton;