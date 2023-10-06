import React from 'react';

const Banner = () => {
    return (
        <div className='h-[40vh] w-full mt-10 relative'>
            <img src='https://bbdu.ac.in/wp-content/uploads/2020/02/utkarsh-website-banner-background.jpg' alt='Banner' className='w-full h-full object-cover' />
            <div className='absolute top-1/2 w-full text-center text-white text-xl'>
                <span>La rentrée</span>
                <p>[Description évènement]</p>
            </div>
        </div>
    );
}

export default Banner;
