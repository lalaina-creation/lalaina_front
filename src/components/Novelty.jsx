'use client'
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import productsAPI from '@/API/products.api';
import ProductInfos from './ProductInfos';

const Novelty = () => {

    const modal = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState(0);

    const [selectedProduct, setSelectedProduct] = useState({});
    const [showModal, setShowModal] = useState(false);

    const listGenders = ['Femmes', 'Hommes', 'Garçons', 'Filles'];

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

    const infosProduct = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        console.log(product)
    }

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('dialog')) {
            setShowModal(false);
        }
    };

    

    return (
        <div className='w-[70%] mx-auto mt-10 flex flex-col gap-10'>

            {/* FEMMES  */}
            
            {listGenders?.map((list) => (
            <>
            <div>
                <div className='flex justify-between items-end' href="#Femmes">
                    <h1 className='text-2xl font-semibold'>{list}</h1>
                    <div className='flex gap-2'>
                        <FaArrowLeft size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' onClick={handlePrev}/>
                        <FaArrowRight size={32} className='text-2xl border border-black rounded-md p-1 cursor-pointer hover:opacity-70' onClick={handleNext}/>
                    </div>

                </div>

                <div className='grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center justify-center mt-6'>
                    {/* Card */}
                    {products?.filter(p => p.gender == list).map((product, index) => (
                            <ProductCard key={index} product={product} infosProduct={infosProduct}  />
                    ))}
                </div>
            </div>

            <div className='border-b border-primary' />
            </>
            ))}


            {/* Modal */}
            {showModal && (
             <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center dialog' onClick={handleOutsideClick}  >
                <ProductInfos product={selectedProduct} setShowModal={setShowModal} />
            </div>
            )}
        </div>
    );
}

export default Novelty;
