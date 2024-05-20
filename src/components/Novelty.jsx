'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import productsAPI from '@/API/products.api';
import ProductInfos from './ProductInfos';
import {Christmasloader, BasicLoader } from './utilities/Loaders';
import { Context } from '@/context/context';


const Novelty = () => {

    const modal = useRef(null);
    const { search } = useContext(Context);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState({});
    const [showModal, setShowModal] = useState(false);

    const listCategories = ['Femmes', 'Hommes', 'Enfants', 'Accessoires'];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
        fetchproducts();
        }, 2000);
    }, []);

    const fetchproducts = async () => {
        setLoading(true);
        try {
            const res = await productsAPI.getProducts();
            setProducts(res);
            setFilteredProducts(res);
            // groupProductsFunction(products);

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

    const handleClose = () => {
        setShowModal(false);
    };
    
    //search
    useEffect(() => {
        if (search != "" && search != null) {
            setFilteredProducts(products?.filter(p => p.title.toLowerCase().includes(search.toLowerCase())));
        } else {
            setFilteredProducts(products);
        }
    }, [search]);

    

    return (
        <div className='w-[70%] mx-auto '>
            
            {loading? (<div className='flex justify-center items-center'>
                <BasicLoader />
            </div>) : (
                <div className='mt-10 flex flex-col gap-10'>
                    
            {/* FEMMES  */}
            {listCategories?.map((list, index) => (
                <ProductList key={index} products={filteredProducts} infosProduct={infosProduct} list={list} />
            ))}


            {/* Modal */}
            {showModal && (
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center dialog' onClick={handleOutsideClick}  >
                <ProductInfos product={selectedProduct} setShowModal={setShowModal} handleClose={handleClose} />
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
        if(number == products?.length) setNumber(4);
        else setNumber(products.length);
    }

    return (
        <>
            <div>
                <div className='flex justify-between items-end' id={list}>
                    <h1 className='text-2xl font-semibold'>{list}</h1>
                    {products?.filter(p => p.category == list).length > 4 && <div className='flex gap-2'>
                        {number == products?.length ? 
                        (<span className='text-xl p-1 cursor-pointer hover:opacity-70' onClick={handleExpand}>Voir moins</span>) 
                        : 
                        (<span className='text-xl p-1 cursor-pointer hover:opacity-70' onClick={handleExpand}>Voir plus</span>)}
                    </div>}

                </div>

                <div className='flex flex-wrap items-center gap-6 justify-center mt-10'>
                    {/* Card */}
                    {products?.filter(p => p.category == list).length == 0 && <div className='text-center text-2xl font-semibold'>Aucun produit</div>}
                    {products?.filter(p => p.category == list).slice(0, number).map((product) => (
                        <ProductCard key={product.id} product={product} infosProduct={infosProduct}  />
                    ))}
                </div>
            </div>
            <div className='border-b border-primary' />
        </>
    );
}

export default Novelty;
