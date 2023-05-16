import React from 'react';

const Loader = (props) => {
    // loading spinner for loading recommendations
    switch(props.size) {
        case 'sm':
            return <div
                className="w-6 h-6 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"
            >
            </div>

        case 'md':
            return <div
                className="w-12 h-12 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"
            >
            </div>
    
        case 'lg': 
            return <div
                className="w-24 h-24 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"
            >
            </div>
    }
};

export default Loader;