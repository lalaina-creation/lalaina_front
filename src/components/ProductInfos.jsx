import Image from 'next/image';
import React from 'react';

const ProductInfos = () => {
    return (
        <div className='rounded-md p-4 flex flex-col'>
            <Image src='https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg' alt='product' width={300} height={300} className='rounded-md' />
            <div>
                <span className='text-lg font-semibold'>Pull</span>
                <span className='italic font-semibold'>10,00€</span>
            </div>
        </div>
    );
}

export default ProductInfos;
