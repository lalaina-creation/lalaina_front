import Image from 'next/image';
import React from 'react';
import { Tags } from './utilities/Elements';

const ProductInfos = ({product}) => {
//outside click
 
    return (
        <div className='bg-gray-200 p-5 rounded-md w-[600px] h-auto relative shadow-2xl border-primary border-2'>
            <div className='flex flex-col rounded-xl transition-all cursor-pointer relative'>
                <div className='h-full'>
                    <img src={product?.image_url? `${process.env.API_URL}/${product.image_url}` : 'https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg'} alt='product' className='w-full h-full object-contain' />
                </div>

                <div className='flex flex-col p-2'>
                    <div className='border-b border-primary my-2' />
                        <div className='w-full flex justify-between'>
                            <div className='flex flex-col'>
                            {product?.category &&
                             <Tags tag={product.category} />
                             }
                             </div>
                             <div className='flex flex-col'>
                                 {product?.attributes.map((attribute, index) => (
                                        <Tags key={index} tag={attribute} />
                                    )
                                 )}
                             </div>
                        </div>
                    <div className='text-lg font-bold text-center first-letter:uppercase mt-4'>{product?.title} </div>
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
