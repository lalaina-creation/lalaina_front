import React from 'react';
import Lottie from 'lottie-react';
import christmas from '@/assets/animations/christmasLoader.json'
import basicLoader from '@/assets/animations/basicLoader.json'

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


export const BasicLoader = () => {
    return (
        <div className='-mt-20'>
            <Lottie 
                animationData={basicLoader}
                loop
                autoPlay
                style={{width: '100%', height: '100%'}}
            />
         </div>
    );
}
