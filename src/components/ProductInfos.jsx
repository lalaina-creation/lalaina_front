import Image from 'next/image';
import React from 'react';
import { Tags } from './utilities/Elements';

const ProductInfos = ({product}) => {
//outside click
 
    return (
        <div className='bg-gray-200 p-5 rounded-md w-1/2 h-auto relative '>
            <div className='flex flex-col rounded-xl transition-all cursor-pointer relative'>
                <div className='h-80'>
                    <img src={product?.image? `${process.env.API_URL}/${product.image}` : 'https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg'} alt='product' className='w-full h-full object-contain' />
                </div>

                <div className='flex flex-col p-2'>
                    <div className='border-b border-primary my-2' />
                        <div className='w-fit flex'>
                            {product?.category && <Tags tag={product.category} />}
                            <Tags tag={product.type} />
                        </div>
                    <div className='text-lg font-bold text-center first-letter:uppercase'>{product?.title} </div>
                    <p className='italic font-bold text-center first-letter:uppercase mt-2 break-words w-4/6 mx-auto'>
                        {product?.description}
                    </p>
                    <div className='flex justify-end items-center mt-6'>
                        <div className='italic font-semibold flex justify-end underline'>{product?.price} € </div>
                    </div>
                </div>
            </div>
        </div>
                
    );
}

export default ProductInfos;
