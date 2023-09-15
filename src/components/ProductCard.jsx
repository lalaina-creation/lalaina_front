import Image from 'next/image';
import React from 'react';

const ProductCard = () => {
    return (
        <div className='flex flex-col rounded-xl'>
            <img src='https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg' alt='product' className='w-full h-full rounded-t-xl' />

            <div className='flex flex-col text-center bg-gray-200 p-2'>
                <span className='text-lg font-semibold'>Pull</span>
                <span className='italic font-semibold'>10,00€</span>
            </div>
        </div>
    );
}

export default ProductCard;
