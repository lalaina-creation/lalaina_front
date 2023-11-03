import React from 'react';
import christmas from '../../assets/animations/christmasLoader.json';
import Lottie from 'lottie-react';

export const Christmasloader = () => {
    return (
        <div className='-mt-20'>
            <Lottie 
                animationData={christmas}
                loop
                autoPlay
                style={{width: '100%', height: '100%'}}
            />
         </div>
    );
}

