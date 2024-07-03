import ProductForm from '@/components/forms/ProductForm';
import React from 'react';

const Page = () => {
    return (
        <div className='inset-0 fixed top-8 left-0 flex justify-center items-center lg:w-2/3 w-5/6 mx-auto h-[94%]'>
            <ProductForm />
        </div>
    );
}

export default Page;
