'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import productsAPI from '@/API/products.api';

const Novelty = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        fetchproducts();
        console.log(products)
    }, []);

    const fetchproducts = async () => {
        try {
            const res = await productsAPI.getProducts();
            console.log('res', res)
            setProducts(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleNext = () => {
        if (number < products.length - 1) {
            setNumber(number + 1);
        }
    };

    const handlePrev = () => {
        if (number > 0) {
            setNumber(number - 1);
        }
    }

    return (
        <div className='w-1/2 mx-auto mt-4'>

            <div className='flex justify-between items-end' href="#Pyjamas">
                <h1 className='text-2xl font-semibold'>Pyjamas</h1>
                <div className='flex gap-2'>
                    <FaArrowLeft size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' onClick={handlePrev}/>
                    <FaArrowRight size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' onClick={handleNext}/>
                </div>

            </div>

            <div className='grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center mt-2'>
                {/* Card */}
                {products?.slice(number, number+4).map((product, index) => (
                        <ProductCard key={index} product={product} />
                ))}
            </div>


            <div className='flex justify-between mt-10' href='#Femmes'>
                <h1 className='text-2xl font-semibold'>Femmes</h1>
                <div className='flex gap-2'>
                    <FaArrowLeft size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' />
                    <FaArrowRight size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70'/>
                </div>

            </div>

            <div className='grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center mt-2'>
                {/* Card */}
                {[1, 2, 3, 4].map((item, index) => (
                        <ProductCard key={index} /> 
                ))}
            </div>
        </div>
    );
}

export default Novelty;
