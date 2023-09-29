import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Tags } from './utilities/Elements';

const ProductCard = ({product, infosProduct}) => {

    // const router = useRouter();
    
    useEffect(() => {
        console.log(product);
    }, [product]);

    const seeProduct = () => {
        infosProduct(product);
        // router.push(`/products/${product.id}`);
    }

    


    return (
        <div className='flex flex-col rounded-xl hover:scale-110 transition-all cursor-pointer' onClick={seeProduct}>
            <img src={product?.image? `${process.env.API_URL}/${product.image}` : 'https://lookhomme.com/wp-content/uploads/2019/08/Pull-cachemire-homme.jpg'} alt='product' className='w-full h-full rounded-t-xl' />

            <div className='flex flex-col bg-gray-200 p-2'>

                <div className='text-lg font-bold text-center ml-2 first-letter:uppercase'>{product?.title} </div>
                <div className='flex justify-between items-center mt-4'>
                    <div className='w-fit'>
                        <Tags tag={product.type} />
                    </div>
                    <div className='italic font-semibold flex justify-end underline'>{product?.price} € </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
