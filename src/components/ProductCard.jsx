import Image from 'next/image';
import React, { useEffect } from 'react';

const ProductCard = ({product}) => {

    useEffect(() => {
        console.log(product);
    }, [product]);
    return (
        <div className='flex flex-col rounded-xl hover:scale-110 transition-all cursor-pointer'>
            <img src={product?.image? `${process.env.API_URL}/${product.image}` : 'https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg'} alt='product' className='w-full h-full rounded-t-xl' />

            <div className='flex flex-col text-center bg-gray-200 p-2'>
                <span className='text-lg font-semibold'>{product?.title} </span>
                <span className='italic font-semibold'>{product?.price} € </span>
            </div>
        </div>
    );
}

export default ProductCard;
