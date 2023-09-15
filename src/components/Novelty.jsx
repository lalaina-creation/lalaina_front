import React from 'react';
import ProductCard from './ProductCard';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Novelty = () => {
    return (
        <div className='w-1/2 mx-auto mt-4'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold'>Pyjamas</h1>
                <div className='flex gap-2'>
                    <FaArrowLeft size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' />
                    <FaArrowRight size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70'/>
                </div>

            </div>

            <div className='grid gap-3 grid-cols-4 justify-center mt-2'>
                {/* Card */}
                {[1, 2, 3, 4].map((item, index) => (
                        <ProductCard key={index} />
                ))}
            </div>
        </div>
    );
}

export default Novelty;
