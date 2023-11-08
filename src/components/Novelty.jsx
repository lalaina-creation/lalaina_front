'use client'
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { FcExpand } from 'react-icons/fc';
import productsAPI from '@/API/products.api';
import ProductInfos from './ProductInfos';
import {Christmasloader } from './utilities/Loaders';

const Novelty = () => {

    const modal = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState({});
    const [showModal, setShowModal] = useState(false);

    const listGenders = ['Femmes', 'Hommes', 'Garçons', 'Filles', 'Accessoires'];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
        fetchproducts();
        }, 2000);
        console.log(products)
    }, []);

    const fetchproducts = async () => {
        setLoading(true);
        try {
            const res = await productsAPI.getProducts();
            console.log('res', res)
            setProducts(res);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

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
        <div className='w-[70%] mx-auto '>
            
            {loading? (<Christmasloader />) : (
                <div className='mt-10 flex flex-col gap-10'>
                    
            {/* FEMMES  */}
            {listGenders?.map((list) => (
                <ProductList products={products} infosProduct={infosProduct}  list={list} />
            ))}


            {/* Modal */}
            {showModal && (
             <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center dialog' onClick={handleOutsideClick}  >
                <ProductInfos product={selectedProduct} setShowModal={setShowModal} />
            </div>
            )}
            
        </div>
        )} 
        </div>
    );
}

const ProductList = ({products, infosProduct, list}) => {
    const [number, setNumber] = useState(4);

    useEffect(() => {
        setNumber(4);
    }
    , [products])

    const handleExpand = () => {
        if(number == products.length) setNumber(4);
        else setNumber(products.length);
    }

    return (
        <>
            <div>
                <div className='flex justify-between items-end' id={list}>
                    <h1 className='text-2xl font-semibold'>{list}</h1>
                    <div className='flex gap-2'>
                        {number == products?.length ? 
                        (<span className='text-xl p-1 cursor-pointer hover:opacity-70' onClick={handleExpand}>Voir moins</span>) 
                        : 
                        (<span className='text-xl p-1 cursor-pointer hover:opacity-70' onClick={handleExpand}>Voir plus</span>)}
                    </div>

                </div>

                <div className='grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center justify-center mt-6 '>
                    {/* Card */}
                    {products?.filter(p => p.gender == list).slice(0, number).map((product, index) => (
                            <ProductCard key={`${index}-${product.title}`} product={product} infosProduct={infosProduct}  />
                    ))}
                </div>
            </div>
            <div className='border-b border-primary' />
        </>
    );
}

export default Novelty;
