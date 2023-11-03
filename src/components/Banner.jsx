import React from 'react';

const Banner = () => {
    return (
        <div className='h-[40vh] w-full mt-10 relative'>
            <img src='https://img.freepik.com/premium-vector/white-christmas-background-festive-web-template-vector_532963-885.jpg?w=2000' alt='Banner' className='w-full h-full object-cover' />
            {/* <img src='https://bbdu.ac.in/wp-content/uploads/2020/02/utkarsh-website-banner-background.jpg' alt='Banner' className='w-full h-full object-cover' /> */}
            <div className='absolute top-1/2 w-full text-center text-xl font-bold'>
                <span>La rentrée</span>
                <p>[Description évènement]</p>
            </div>
        </div>
    );
}

export default Banner;
