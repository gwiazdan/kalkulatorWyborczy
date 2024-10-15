import {RotatingLines} from 'react-loader-spinner';
import React from "react";

const Loader: React.FC = () => {

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeColor="cyan"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loader;